FROM node:18.12
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g npm@9.1.2
RUN npm ci
COPY . .
# RUN npm run build
ENV PORT 3000
EXPOSE 3000
EXPOSE 24678 
CMD npm run dev -- --host 
