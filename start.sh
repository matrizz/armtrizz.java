#!/bin/sh

echo "🚀 Iniciando o bot com PM2..."

mkdir db

echo "Criando pastas..."

touch db/database.json

echo "Criando arquivo de banco de dados..."

pm2 start index.js --name matrizz.java || { echo "❌ Falha ao iniciar o bot."; exit 1; }

pm2 save

pm2 startup | tail -n 1 | bash

echo "✅ Bot iniciado com sucesso e configurado para iniciar no boot!"

echo "🚀 Para encerrar o bot, use o comando 'pm2 stop matrizz.java'."