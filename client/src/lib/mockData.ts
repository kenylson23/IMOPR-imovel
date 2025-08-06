import type { Property, Agent } from "@shared/schema";

export const mockProperties: Property[] = [
  {
    id: "prop-1",
    title: "Apartamento de Luxo na Ilha de Luanda",
    description: "Magnífico apartamento com vista para o mar, acabamentos de primeira qualidade e localização privilegiada na Ilha de Luanda.",
    price: "85000000",
    currency: "AOA",
    type: "apartment",
    status: "available",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    location: "Ilha de Luanda",
    city: "Luanda",
    province: "Luanda",
    address: "Rua da Ilha, Edificio Atlantico, Apartamento 15A",
    features: ["Vista para o mar", "Ar condicionado", "Garagem", "Segurança 24h", "Piscina"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515263487990-61b07816b522?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
    ],
    agentId: "agent-1",
    featured: true,
    createdAt: new Date("2025-01-06"),
    updatedAt: new Date("2025-01-06"),
  },
  {
    id: "prop-2",
    title: "Casa Moderna com Jardim",
    description: "Linda casa moderna com amplo jardim, ideal para famílias que procuram conforto e tranquilidade.",
    price: "120000000",
    currency: "AOA",
    type: "house",
    status: "available",
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    location: "Centro",
    city: "Benguela",
    province: "Benguela",
    address: "Rua do Centro, Casa 45",
    features: ["Jardim", "Garagem dupla", "Cozinha moderna", "Churrasqueira", "Sistema solar"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop"
    ],
    agentId: "agent-2",
    featured: true,
    createdAt: new Date("2025-01-06"),
    updatedAt: new Date("2025-01-06"),
  },
  {
    id: "prop-3",
    title: "Edifício Comercial Prime",
    description: "Excelente oportunidade de investimento em edifício comercial localizado em zona nobre de Huambo.",
    price: "450000000",
    currency: "AOA",
    type: "commercial",
    status: "available",
    bedrooms: null,
    bathrooms: 8,
    area: 1200,
    location: "Centro Comercial",
    city: "Huambo",
    province: "Huambo",
    address: "Avenida Principal, Edificio Comercial Prime",
    features: ["5 Andares", "20 Vagas de estacionamento", "Elevador", "Gerador", "Sistema de segurança"],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop"
    ],
    agentId: "agent-3",
    featured: true,
    createdAt: new Date("2025-01-06"),
    updatedAt: new Date("2025-01-06"),
  },
  {
    id: "prop-4",
    title: "Apartamento T2 no Maianga",
    description: "Apartamento bem localizado no Maianga, próximo a escolas e centros comerciais.",
    price: "45000000",
    currency: "AOA",
    type: "apartment",
    status: "available",
    bedrooms: 2,
    bathrooms: 1,
    area: 80,
    location: "Maianga",
    city: "Luanda",
    province: "Luanda",
    address: "Rua do Maianga, Edifício São João, Apto 8B",
    features: ["Ar condicionado", "Cozinha equipada", "Varanda", "Portaria"],
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"],
    agentId: "agent-1",
    featured: false,
    createdAt: new Date("2025-01-06"),
    updatedAt: new Date("2025-01-06"),
  },
  {
    id: "prop-5",
    title: "Casa T3 no Lobito",
    description: "Casa espaçosa com quintal amplo, ideal para quem procura sossego perto do mar.",
    price: "65000000",
    currency: "AOA",
    type: "house",
    status: "available",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    location: "Restinga",
    city: "Lobito",
    province: "Benguela",
    address: "Rua da Restinga, Casa 23",
    features: ["Quintal", "Garagem", "Próximo à praia", "Cozinha moderna"],
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"],
    agentId: "agent-2",
    featured: false,
    createdAt: new Date("2025-01-06"),
    updatedAt: new Date("2025-01-06"),
  },
  {
    id: "prop-6",
    title: "Loja Comercial no Centro",
    description: "Excelente loja comercial em zona de grande movimento, perfeita para negócios.",
    price: "35000000",
    currency: "AOA",
    type: "commercial",
    status: "available",
    bedrooms: null,
    bathrooms: 1,
    area: 60,
    location: "Centro",
    city: "Malanje",
    province: "Malanje",
    address: "Rua Comercial, Loja 15",
    features: ["Montra ampla", "Armazém", "WC", "Zona movimentada"],
    images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"],
    agentId: "agent-4",
    featured: false,
    createdAt: new Date("2025-01-06"),
    updatedAt: new Date("2025-01-06"),
  },
];

export const mockAgents: Agent[] = [
  {
    id: "agent-1",
    name: "João Silva",
    email: "joao.silva@palancareal.ao",
    phone: "+244 923 456 789",
    specialty: "Especialista em Luanda",
    experience: 5,
    salesCount: 80,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    bio: "Especialista em imóveis residenciais e comerciais na região de Luanda.",
    social: [],
    createdAt: new Date("2025-01-06"),
  },
  {
    id: "agent-2",
    name: "Maria Santos",
    email: "maria.santos@palancareal.ao",
    phone: "+244 923 456 790",
    specialty: "Especialista em Benguela",
    experience: 7,
    salesCount: 120,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=200&h=200&fit=crop&crop=face",
    bio: "Foco em propriedades residenciais de alto padrão em Benguela.",
    social: [],
    createdAt: new Date("2025-01-06"),
  },
  {
    id: "agent-3",
    name: "Carlos Mendes",
    email: "carlos.mendes@palancareal.ao",
    phone: "+244 923 456 791",
    specialty: "Especialista Comercial",
    experience: 8,
    salesCount: 95,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    bio: "Especializado em imóveis comerciais e investimentos.",
    social: [],
    createdAt: new Date("2025-01-06"),
  },
  {
    id: "agent-4",
    name: "Ana Ferreira",
    email: "ana.ferreira@palancareal.ao",
    phone: "+244 923 456 792",
    specialty: "Especialista em Huambo",
    experience: 6,
    salesCount: 75,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    bio: "Conhecimento profundo do mercado imobiliário em Huambo.",
    social: [],
    createdAt: new Date("2025-01-06"),
  },
];

export const getFeaturedProperties = (): Property[] => {
  return mockProperties.filter(p => p.featured);
};

export const getAllProperties = (filters?: {
  city?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
}): Property[] => {
  let properties = [...mockProperties];

  if (filters) {
    if (filters.city && filters.city !== "all") {
      properties = properties.filter(p => p.city.toLowerCase().includes(filters.city!.toLowerCase()));
    }
    if (filters.type && filters.type !== "all") {
      properties = properties.filter(p => p.type === filters.type);
    }
    if (filters.minPrice) {
      properties = properties.filter(p => parseFloat(p.price) >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      properties = properties.filter(p => parseFloat(p.price) <= filters.maxPrice!);
    }
    if (filters.bedrooms) {
      properties = properties.filter(p => p.bedrooms === filters.bedrooms);
    }
  }

  return properties.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
};

export const getPropertyById = (id: string): Property | undefined => {
  return mockProperties.find(p => p.id === id);
};

export const getAllAgents = (): Agent[] => {
  return [...mockAgents];
};

export const getAgentById = (id: string): Agent | undefined => {
  return mockAgents.find(a => a.id === id);
};