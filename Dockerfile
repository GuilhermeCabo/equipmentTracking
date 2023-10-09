# Use the node.js image as the base
FROM node:20-slim

# Define the NODE_ENV environment variable
ENV NODE_ENV development

# Copy the package.json and package-lock.json (or yarn.lock) to the working directory
# Define the working directory
WORKDIR /app

# Copy the rest of the project files
COPY . .

# Expose port 8000
EXPOSE 8000

# Install node_modules
RUN npm install

# Default command to run the application
CMD [ "npm", "install" ]

# Default command to run the application
CMD [ "npm", "start" ]