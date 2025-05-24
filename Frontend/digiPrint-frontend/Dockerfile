# Use Node for build stage
FROM node:18-alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Use Nginx for serving Angular app
FROM nginx:alpine
COPY --from=build /app/dist/* /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
