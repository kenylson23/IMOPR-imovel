#!/bin/bash

# Build script específico para Netlify
echo "🏗️ Building Palanca Real for Netlify..."

# Definir variável de ambiente para modo estático
export VITE_STATIC_MODE=true

# Executar build do Vite
npm run build

# Verificar se o build foi bem-sucedido
if [ ! -d "dist/public" ]; then
  echo "❌ Build failed: dist/public directory not found"
  exit 1
fi

# Copiar arquivos de configuração para o diretório de deploy
cp _redirects dist/public/ 2>/dev/null || echo "⚠️ _redirects not found, creating default..."
cp netlify.toml dist/public/ 2>/dev/null || echo "⚠️ netlify.toml not found"

# Criar _redirects se não existir
if [ ! -f "dist/public/_redirects" ]; then
  echo "/*    /index.html   200" > dist/public/_redirects
fi

# Verificar arquivos essenciais
if [ -f "dist/public/index.html" ]; then
  echo "✅ index.html found"
else
  echo "❌ index.html not found!"
  exit 1
fi

if [ -f "dist/public/_redirects" ]; then
  echo "✅ _redirects configured"
else
  echo "❌ _redirects missing!"
fi

echo "🎉 Build completed successfully!"
echo "📁 Deploy directory: dist/public"
echo "📝 Files ready:"
ls -la dist/public/

echo ""
echo "🚀 Ready for Netlify deploy!"
echo "   Publish directory: dist/public"
echo "   Build command: bash build-netlify.sh"