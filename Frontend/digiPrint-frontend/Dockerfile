# Base Angular image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy Angular project
COPY . .

# Build the Angular app
RUN npm run build --prod

# Serve with nginx
FROM nginx:alpine
COPY --from=0 /app/dist/* /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
