import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { getFeaturedProperties, getAllProperties, getPropertyById, getAllAgents, getAgentById } from "./mockData";

// Detecta modo estático: produção no Netlify ou quando não há servidor local
const isStaticMode = 
  import.meta.env.VITE_STATIC_MODE === 'true' || 
  window.location.protocol === 'file:' ||
  (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') ||
  import.meta.env.PROD;

// Log para debug
console.log('🔍 Modo de detecção:', {
  VITE_STATIC_MODE: import.meta.env.VITE_STATIC_MODE,
  protocol: window.location.protocol,
  hostname: window.location.hostname,
  PROD: import.meta.env.PROD,
  isStaticMode
});

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

// Mock API responses for static mode
async function getMockData(path: string): Promise<any> {
  const [, , endpoint, ...params] = path.split('/');
  
  switch (endpoint) {
    case 'properties':
      if (params[0] === 'featured') {
        return getFeaturedProperties();
      } else if (params[0]) {
        return getPropertyById(params[0]);
      } else {
        return getAllProperties();
      }
    case 'agents':
      if (params[0]) {
        return getAgentById(params[0]);
      } else {
        return getAllAgents();
      }
    default:
      throw new Error(`Unknown endpoint: ${endpoint}`);
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const path = queryKey.join("/") as string;
    
    // Verifica se está em modo estático ou se a API não está disponível
    if (isStaticMode) {
      console.log('🔧 Usando dados estáticos para:', path);
      await new Promise(resolve => setTimeout(resolve, 100)); // Simula delay de rede
      return getMockData(path);
    }
    
    // Tenta usar a API real primeiro, fallback para dados estáticos
    try {
      const res = await fetch(path, {
        credentials: "include",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      return await res.json();
    } catch (error) {
      console.log('⚠️ API não disponível, usando dados estáticos para:', path);
      await new Promise(resolve => setTimeout(resolve, 100));
      return getMockData(path);
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: isStaticMode ? Infinity : 5 * 60 * 1000,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
