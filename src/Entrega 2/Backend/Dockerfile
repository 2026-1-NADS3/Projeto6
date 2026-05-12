# Usa a imagem oficial do Node.js
FROM node:18

# Define a pasta de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de dependências primeiro (otimiza o cache)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o resto do seu código para dentro do container
COPY . .

# Informa qual porta o container vai "ouvir"
EXPOSE 3000

# Comando para ligar o servidor
CMD ["node", "server.js"]