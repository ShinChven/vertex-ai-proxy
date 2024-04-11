# Build stage
FROM shinchven/node:20-build AS build
WORKDIR /usr/src/app
COPY ./app .
RUN npm install
RUN npm run compile 

# Deployment stage
FROM node:alpine

LABEL author="ShinChven" email="shinchven@gmail.com"

WORKDIR /usr/src/app
COPY --from=build /usr/src/app .
EXPOSE 3030
# pm2 docker run command
CMD ["npm","start"]

