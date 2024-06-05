FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY node_modules node_modules
COPY public public
COPY src src
RUN npm run build
RUN npm install --ignore-scripts -g serve
EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]