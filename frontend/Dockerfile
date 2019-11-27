# The builder from node image
FROM node:10.16.3 as builder

RUN apt update

# Move our files into directory name "app"
WORKDIR /app
COPY package.json package-lock.json  /app/
RUN npm install @angular/cli@8.3.19 -g
RUN cd /app && npm install
COPY .  /app

RUN cd /app && npm run build --prod

# Build a small nginx image with static website
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/_config/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]