#!/bin/sh

echo "🚀 Iniciando o bot com PM2..."

echo "Criando pastas..."

mkdir db

echo "Criando arquivo de banco de dados..."

touch db/database.json

touch db/anitrack.json

echo "Iniciando o bot..."

pm2 start index.js --name matrizz.java || { echo "❌ Falha ao iniciar o bot."; exit 1; }

pm2 save

pm2 startup | tail -n 1 | bash

echo "✅ Bot iniciado com sucesso e configurado para iniciar no boot!"

echo "🚀 Para encerrar o bot, use o comando 'pm2 stop matrizz.java'."