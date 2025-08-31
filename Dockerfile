FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies specified in package.json
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000 to allow external access
EXPOSE 3000

# Command to run the application
CMD ["node", "src/user-service/index.js"]