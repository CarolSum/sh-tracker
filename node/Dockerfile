FROM node:latest

RUN mkdir -p /home/www/hm-se
WORKDIR /home/www/hm-se
 
COPY . /home/www/hm-se

RUN rm -f node_modules \
    ; npm config set registry "https://registry.npm.taobao.org/" \
    && npm install

EXPOSE 3002
CMD ["node", "app.js"]