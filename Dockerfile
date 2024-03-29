# Use the official Node.js image as base
FROM node:21.6.1 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Start a new stage with a lighter base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built application code from the previous stage
COPY --from=build /app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "./dist/app.js"]
