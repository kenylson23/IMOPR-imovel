# Palanca Real - Portal Imobiliário de Angola

## Overview
Uma plataforma imobiliária moderna e responsiva para Angola que oferece experiências otimizadas para smartphones, tablets e dispositivos com telas pequenas. O aplicativo utiliza React.js, Tailwind CSS, e componentes shadcn/ui para criar uma interface fluida e acessível em todos os dispositivos.

## Recent Changes

### Otimizações de Responsividade Móvel (Janeiro 2025)
- **Meta tags otimizadas**: Adicionadas configurações específicas para dispositivos móveis, incluindo viewport responsivo, tema colors, e otimizações para PWA
- **Header responsivo**: Melhorada a navegação com breakpoints otimizados (lg:hidden ao invés de md:hidden), logo responsivo, e menu mobile aprimorado
- **Seção Hero otimizada**: Hero section com altura adaptativa (min-h-[90vh] sm:min-h-screen), tipografia responsiva com clamp(), e elementos glassmorphism condicionais para mobile
- **Estatísticas responsivas**: Grid system melhorado (grid-cols-2 md:grid-cols-4), padding e spacing fluidos
- **Componentes otimizados**: PropertySearch com grid responsivo (sm:grid-cols-2 lg:grid-cols-4), PropertyCard com alturas adaptativas, Footer com layout flexível
- **CSS personalizado**: Adicionadas classes utilitárias para touch targets, botões responsivos, containers móveis, grids responsivos, tipografia otimizada, e safe area padding para iOS

## Project Architecture

### Frontend Structure
```
client/src/
├── components/
│   ├── layout/
│   │   ├── header.tsx        # Header responsivo com menu mobile
│   │   └── footer.tsx        # Footer com layout flexível
│   ├── property/
│   │   ├── property-search.tsx  # Busca responsiva
│   │   └── property-card.tsx    # Cards otimizados para mobile
│   └── ui/                   # Componentes shadcn/ui
├── pages/
│   └── home.tsx             # Página principal otimizada
├── hooks/
└── lib/
```

### Tecnologias Utilizadas
- **Frontend**: React.js com TypeScript
- **Styling**: Tailwind CSS com configuração responsiva personalizada
- **Components**: shadcn/ui (Button, Card, Sheet, Select, etc.)
- **Icons**: Lucide React
- **Routing**: Wouter
- **State Management**: React Query (TanStack Query)

### Responsive Design Features
1. **Mobile-First Approach**: Design pensado primeiro para dispositivos móveis
2. **Touch Optimizations**: Alvos de toque com mínimo 44px, botões maiores em mobile
3. **Fluid Typography**: Sistema de tipografia usando clamp() para escalar automaticamente
4. **Adaptive Layouts**: Grids e layouts que se adaptam de 1 coluna (mobile) até 4 colunas (desktop)
5. **Performance**: Imagens responsivas, lazy loading, e otimizações de renderização
6. **Accessibility**: Estados de foco melhorados, contraste adequado, navegação por teclado

### CSS Classes Personalizadas
- `.touch-target`: Garante alvos de toque adequados (44px mínimo)
- `.btn-responsive`: Botões que se adaptam ao tamanho da tela
- `.mobile-container`: Containers com padding fluido
- `.responsive-grid`: Sistema de grid adaptativo
- `.hero-mobile`, `.hero-content-mobile`: Otimizações específicas para hero section
- `.img-responsive`: Imagens que se adaptam responsivamente
- `.safe-area-padding`: Suporte a safe areas em iOS

### Breakpoints
- **xs**: < 480px (smartphones pequenos)
- **sm**: 640px+ (smartphones grandes)
- **md**: 768px+ (tablets portrait)
- **lg**: 1024px+ (tablets landscape / desktop pequeno)
- **xl**: 1280px+ (desktop)

## User Preferences
- Usuário solicitou otimização específica para smartphones, tablets e dispositivos com telas pequenas
- Preferência por interfaces fluidas e acessíveis em todos os dispositivos
- Foco na usabilidade mobile sem comprometer a experiência desktop

## Development Notes
- Todos os componentes foram revisados para garantir responsividade
- Implementadas otimizações específicas para touch devices
- Corrigidos problemas de DOM nesting (nested anchor tags) no header e footer
- Adicionadas classes CSS personalizadas para casos de uso específicos
- Layout hero otimizado para diferentes tamanhos de tela
- Sistema de grid responsivo implementado em toda a aplicação

## Next Steps
- Testes de usabilidade em diferentes dispositivos
- Otimizações de performance para mobile
- Implementação de PWA features
- Melhorias de acessibilidade (ARIA labels, navegação por teclado)