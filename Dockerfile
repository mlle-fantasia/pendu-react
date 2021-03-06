# build environment
FROM node:lts as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json

RUN npm install react-scripts@latest -g --silent
RUN npm install --silent

COPY ./ /usr/src/app
RUN npm run build

# production environment
FROM nginx:alpine as prod
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]