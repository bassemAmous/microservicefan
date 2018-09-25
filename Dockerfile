FROM node:latest

WORKDIR /home/node
COPY ./ /home/node

# Install Node modules
RUN rm -Rf package-lock.json node_modules/ \
    && npm install --productiondoc

EXPOSE 9000

USER root
CMD ["npm", "run", "start"]
