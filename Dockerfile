FROM node:14

WORKDIR /movies
ENV PATH="./node_modules/.bin:$PATH"
COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "start"]