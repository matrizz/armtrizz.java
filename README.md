# 🤖 matrizz.java — Discord Bot

Bot de Discord desenvolvido com Node.js e Discord.js, com estrutura modular, comandos interativos e scripts automatizados para deploy em servidores como AWS EC2.

---

## 🚀 Funcionalidades

- Comandos slash com `Discord.js`
- Estrutura modular organizada
- Variáveis de ambiente para fácil configuração
- Scripts `start.sh` e `update.sh` para automação
- Deploy com PM2 para manter o bot rodando 24/7

---

## 🛠️ Tecnologias

- Node.js
- Discord.js
- pnpm
- PM2
- AWS EC2 (Ubuntu)

---

## 📦 Instalação

```sh
# Clone o projeto
git clone https://github.com/matrizz/matrizz.java.git

# Acesse o diretório
cd matrizz.java

# Copie o exemplo de .env
cp .env.example .env

# Instale as dependências
pnpm install
```

## ⚙️ Variáveis de Ambiente

**NÃO** esqueça de fornecer o `TOKEN` do bot.

```env
TOKEN=<seu-token-do-bot>
```

---

## 🧪 Rodando localmente

```sh
pnpm dev
```

---

## ☁️ Rodando na AWS com PM2

### Inicializar o bot

```sh
sh ./start.sh
```

### Atualizar o código e reiniciar o bot

```sh
sh ./update.sh
```

Esses scripts garantem que o bot continue online mesmo após fechar o terminal ou reiniciar a instância.

---

## 📂 Scripts

- `start.sh`: Inicia o bot com PM2 e registra o processo no boot do sistema.

- `update.sh`: Faz `git pull`, reinstala dependências e reinicia o bot via PM2.
