FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000

RUN addgroup -S nonroot && adduser -S nonroot -G nonroot
USER nonroot

CMD ["serve", "-s", "build", "-l", "3000"]