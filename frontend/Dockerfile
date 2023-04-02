FROM node:16-alpine AS builder 
ENV NODE_ENV production

WORKDIR /app

COPY frontend/package .
RUN npm install --production

COPY frontend .

RUN npm run build

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV=production

COPY --from=builder /app/build /usr/share/nginx/html

COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx","-g",'daemon off;' ]