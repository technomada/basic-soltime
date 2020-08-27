FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
#upg: copy from github

COPY . .

#ADD https://raw.githubusercontent.com/mourner/suncalc/master/suncalc.js ./www/suncalc.js
#or add this in the install step? and run install as part of the build process.

EXPOSE 3000

CMD ["node","server.js"]
