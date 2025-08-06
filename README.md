# Palanca Real - Portal Imobiliário de Angola

Uma plataforma imobiliária moderna e responsiva para Angola, otimizada para dispositivos móveis e tablets.

## 🚀 Deploy no Netlify

### Preparação para Deploy Estático

Este projeto foi configurado para funcionar tanto em modo desenvolvimento (com servidor backend) quanto em modo estático para deploy no Netlify.

### Passos para Deploy

1. **Conectar ao Netlify**
   - Acesse [netlify.com](https://netlify.com)
   - Conecte seu repositório GitHub/GitLab
   - Ou faça upload manual da pasta `dist/`

2. **Configurações de Build**
   ```
   Build command: npm run build
   Publish directory: dist
   Node version: 20
   ```

3. **Variáveis de Ambiente** (opcional)
   ```
   VITE_STATIC_MODE=true
   ```

### Build Local

Para testar o build localmente:

```bash
# Build para produção
npm run build

# Preview do build
npm run preview
```

### Estrutura do Projeto

```
├── client/          # Frontend React
├── server/          # Backend Express (apenas dev)
├── shared/          # Tipos TypeScript compartilhados
├── dist/            # Build output para deploy
├── netlify.toml     # Configuração Netlify
└── _redirects       # Redirecionamentos SPA
```

## 🛠 Desenvolvimento

```bash
# Instalar dependências
npm install

# Desenvolvimento com servidor
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📱 Recursos

- ✅ Totalmente responsivo (mobile-first)
- ✅ Interface moderna com glassmorphism
- ✅ Busca avançada de propriedades
- ✅ Perfis de agentes
- ✅ Formulários de contacto
- ✅ Mapas interativos de Angola
- ✅ Calculadora de financiamento
- ✅ Comparador de propriedades
- ✅ Otimizado para SEO
- ✅ PWA ready

## 🌐 Modo Estático

Em produção (Netlify), o app funciona de forma completamente estática usando dados mock. Isso garante:

- ⚡ Carregamento super rápido
- 💰 Zero custos de servidor
- 🔒 Máxima segurança
- 📈 Escalabilidade infinita

## 📧 Funcionalidades

### Propriedades
- Listagem de imóveis em destaque
- Busca por localização, tipo e preço
- Detalhes completos com galeria de imagens
- Filtros avançados

### Agentes
- Perfis de agentes imobiliários
- Especialidades por região
- Informações de contacto

### Ferramentas
- Calculadora de financiamento
- Comparador de propriedades
- Mapas de Angola com regiões

### Design Responsivo
- Otimizado para smartphones (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Touch-friendly em todos os dispositivos

## 🔧 Tecnologias

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Routing**: Wouter
- **State**: TanStack Query
- **Icons**: Lucide React
- **Build**: Vite
- **Deploy**: Netlify

## 📝 Notas

- O projeto inclui dados demo para demonstração
- Formulários capturam dados localmente
- Mapas usam SVG interativo personalizado
- Todas as imagens vêm do Unsplash

## 🚀 Deploy Rápido

1. Clique em "Deploy to Netlify"
2. Conecte seu repositório
3. Site estará online em minutos!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/palanca-real)