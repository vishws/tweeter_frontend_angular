# Use an official Node runtime as a parent image
FROM node:latest as build

# Create a directory for the app
WORKDIR /usr/local/app

# Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY package-lock.json .

# Install app dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Build the Angular app for production
RUN npm run build

# Stage 2: Use nginx image and copy the Angular build
FROM nginx:1.21.4

# Create a directory for your app in the container
WORKDIR /usr/share/nginx/html

# Copy the Angular build from the build image to the appropriate directory
COPY --from=build /usr/local/app/dist/angular-login-app/ .

# Expose port 80
EXPOSE 80
