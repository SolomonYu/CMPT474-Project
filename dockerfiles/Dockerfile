# Copy the file from your host to your current location.
FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /<YOUR PATH TO HTML AND JS FILES>

# Copy the file from your host to your current location.
COPY package.json .

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

EXPOSE 3000
CMD [ "http-server" ]
