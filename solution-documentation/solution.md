# My solution to the given test task.

## Step 0 - setup
First I created the angular project, and modified package.json file to permit connection from any host avoiding locking myself out.
```json
"scripts": {
    "ng": "ng",
    "start": "ng serve --host 0.0.0.0",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
```
Then I thought it would be easier to work with the backend if they are in the same docker stack, so I added a Dockerfile to the frontend project and added it to the docker compose.
```Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

EXPOSE 4200
```

```yml
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend/airplane-app
      dockerfile: Dockerfile
    ports: 
      - "4200:4200"
    volumes:
      - ./frontend/airplane-app:/app
      - /app/node_modules
    command: npm start
    restart: always
    depends_on:
      - backend
```