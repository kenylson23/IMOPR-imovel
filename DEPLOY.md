# 🚀 Guia de Deploy para Netlify

## ✅ Preparação Concluída

O projeto **Palanca Real** está totalmente preparado para deploy estático no Netlify com as seguintes configurações:

### Arquivos de Configuração Criados:
- ✅ `netlify.toml` - Configuração principal do Netlify
- ✅ `_redirects` - Redirecionamentos para SPA
- ✅ `README.md` - Documentação completa
- ✅ Sistema de dados mock para modo estático

### Build Realizado:
- ✅ Build de produção executado com sucesso
- ✅ Arquivos otimizados na pasta `dist/public/`
- ✅ CSS: 91.26 kB (gzipped: 15.42 kB)
- ✅ JS: 512.10 kB (gzipped: 152.10 kB)

## 🎯 Passos para Deploy no Netlify

### Opção 1: Deploy via Git (Recomendado)

1. **Conectar Repositório**
   - Acesse [netlify.com](https://netlify.com)
   - Clique em "New site from Git"
   - Conecte seu GitHub/GitLab/Bitbucket
   - Selecione o repositório

2. **Configurações de Build**
   ```
   Build command: npm run build
   Publish directory: dist/public
   Node version: 20
   ```

3. **Deploy Automático**
   - Netlify detectará as configurações do `netlify.toml`
   - Build será executado automaticamente
   - Site estará online em poucos minutos

### Opção 2: Deploy Manual

1. **Upload da Pasta**
   - Acesse [netlify.com](https://netlify.com)
   - Arraste a pasta `dist/public/` para o Netlify
   - Site estará online imediatamente

2. **Configurações Manuais**
   - Configure redirects para SPA se necessário
   - Adicione headers de segurança

## ⚙️ Configurações Incluídas

### netlify.toml
```toml
[build]
  publish = "dist/public"
  command = "npm run build"
  
[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Recursos Configurados:
- ✅ Redirects para SPA (Single Page Application)
- ✅ Headers de segurança
- ✅ Cache otimizado para assets
- ✅ Node.js 20 para build
- ✅ Modo estático automático

## 🔧 Modo de Funcionamento

### Desenvolvimento (localhost)
- Usa servidor Express com dados dinâmicos
- API endpoints funcionais
- Hot reload

### Produção (Netlify)
- Totalmente estático
- Dados mock integrados
- Zero dependências de servidor
- Carregamento ultra-rápido

## 📱 Otimizações Incluídas

- ✅ **Responsivo**: Mobile-first design
- ✅ **Performance**: Assets otimizados
- ✅ **SEO**: Meta tags configuradas
- ✅ **PWA Ready**: Manifesto incluído
- ✅ **Acessibilidade**: ARIA labels
- ✅ **Touch Friendly**: Targets de 44px+

## 🎨 Funcionalidades Ativas

### Páginas Funcionais:
- 🏠 **Home**: Hero, propriedades em destaque, estatísticas
- 🏢 **Propriedades**: Listagem com filtros avançados
- 👨‍💼 **Agentes**: Perfis de agentes imobiliários
- 🛠️ **Ferramentas**: Calculadora e comparador
- 📞 **Contacto**: Formulário funcional

### Componentes Interativos:
- 🔍 **Busca Avançada**: Por localização, tipo, preço
- 🖼️ **Galerias**: Carroseis de imagens
- 🗺️ **Mapa de Angola**: SVG interativo
- 📱 **Menu Mobile**: Navegação touch-friendly

## 🚀 URL de Preview

Após o deploy, o site estará disponível em:
- `https://seu-site-nome.netlify.app`
- Domínio personalizado (se configurado)

## 🔧 Troubleshooting

### Build Falha?
- Verifique se Node.js 20 está configurado
- Confirme se `npm install` roda sem erros

### Página 404?
- Verifique se `_redirects` está na pasta raiz
- Confirme redirecionamento SPA no netlify.toml

### Assets Não Carregam?
- Verifique se a pasta `dist/public` está sendo publicada
- Confirme se paths das imagens estão corretos

## ✨ Resultado Final

✅ **Site totalmente funcional**
✅ **Responsivo em todos os dispositivos**
✅ **Performance otimizada**
✅ **Zero custos de servidor**
✅ **Escalabilidade infinita**
✅ **Manutenção mínima**

---

**🎉 Pronto para Deploy!** 
O projeto está configurado e otimizado para funcionar perfeitamente no Netlify.