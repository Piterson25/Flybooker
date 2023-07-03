# Flybooker

✈️ MERN app with Keycloak

![flybooker.png](https://github.com/Piterson25/Flybooker/blob/main/screenshots/flybooker.png)

Flybooker is a web application built on the MERN (MongoDB, Express, React, Node.js) stack, secured with Keycloak. It allows users to book flights and manage flight listings. After logging in as a regular user, you can access the flight list, while admins have additional privileges such as deleting flights. The project includes a Docker Compose configuration for running Keycloak and MongoDB. Follow the instructions below to get started with Flybooker.

## 🛠️ Technologies Used

Flybooker is built using the following technologies:

- MongoDB
- Express
- React
- Node.js
- JavaScript
- Keycloak

## 🚀 Getting Started

To start the Flybooker application, follow these steps:

1. Run the following command to start Keycloak and MongoDB using Docker Compose:

   ```sh
   docker-compose up
   ```

2. After the containers are up and running, execute the [script.sh](https://github.com/Piterson25/Flybooker/blob/main/script.sh) script to start the frontend and backend:

   ```sh
   ./script.sh
   ```

   This script installs the necessary dependencies and starts the frontend and backend servers.

3. Access the Flybooker application by opening your web browser and navigating to [http://localhost:3000](http://localhost:3000).

## 🔑 Login Credentials

Use the following credentials to log in:

Regular User:
- Username: myuser
- Password: myuser

Admin:
- Username: myadmin
- Password: myadmin

## 🎉 Features
### Flight Listing
Upon logging in as a regular user, you gain access to a flight listing section. Browse through a curated selection of example flights and view their details.

### Admin Section
As an admin, you have additional privileges. In addition to accessing the user flight listing, you can also navigate to the admin section. Explore a broader range of flights and enjoy the ability to delete unwanted flights from the database.

## 📄 License
Flybooker is licensed under the MIT License. See the [LICENSE](https://github.com/Piterson25/Flybooker/blob/main/LICENSE) file for more information.
