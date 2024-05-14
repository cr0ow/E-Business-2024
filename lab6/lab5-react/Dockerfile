FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .
RUN npm run build
RUN npm install --ignore-scripts -g serve
EXPOSE 3000

RUN addgroup -S nonroot && adduser -S nonroot -G nonroot
USER nonroot

CMD ["serve", "-s", "build", "-l", "3000"]