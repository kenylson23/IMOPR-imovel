import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { getFeaturedProperties, getAllProperties, getPropertyById, getAllAgents, getAgentById } from "./mockData";

const isStaticMode = import.meta.env.VITE_STATIC_MODE === 'true' || window.location.protocol === 'file:';

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
    
    // Use mock data in static mode
    if (isStaticMode) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
      return getMockData(path);
    }
    
    // Use real API in development mode
    const res = await fetch(path, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
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
