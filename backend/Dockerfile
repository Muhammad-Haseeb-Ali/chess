# Use an official Node.js LTS image based on Linux
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Bundle your source code into the container
COPY . .
# Install application dependencies

RUN npm install

# Expose the port your app runs on (if needed)
EXPOSE 8000

# Define the command to start your application
CMD ["npm", "start"]