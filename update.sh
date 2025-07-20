#!/bin/sh

echo "🔄 Atualizando repositório..."
git pull origin main || { echo "❌ Falha ao atualizar repositório."; exit 1; }

echo "📦 Instalando dependências..."
pnpm install || { echo "❌ Falha ao instalar dependências."; exit 1; }

echo "♻️ Reiniciando o bot com PM2..."
pm2 restart bot || { echo "❌ Falha ao reiniciar o bot com PM2."; exit 1; }

echo "✅ Bot atualizado e reiniciado com sucesso!"
