# SecureREST

SecureREST is a robust and secure RESTful API built with PostgreSQL, Express, Prisma, and TypeScript, featuring JWT authentication for seamless CRUD operations. This project is ideal for building scalable and secure backend solutions.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete functionalities.
- **Authentication**: Secure JWT-based authentication.
- **Database**: PostgreSQL integration using Prisma.
- **Type Safety**: Developed with Zod for improved reliability and maintainability.

## Tech Stack

- **Backend Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Language**: TypeScript
- **Authentication**: JSON Web Tokens (JWT)

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (>=14.x)
- PostgreSQL (>=12.x)
- npm (or yarn)

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/danieljml/SecureREST.git
    cd SecureREST
    ```

2. **Install dependencies:**

    ```sh
    npm install
    # or
    yarn install
    ```

3. **Set up the environment variables:**

    Create a `.env` file in the root directory and add the following content, replacing the example values with your actual configuration:

    ```env
    # Server configuration
    PORT=3000

    # JWT configuration
    JWT_SECRET=your_jwt_secret_key
    JWT_ALGORITHM=RS256

    # PostgreSQL configuration
    POSTGRES_PASSWORD=your_postgres_password
    POSTGRES_USER=your_postgres_user
    POSTGRES_DB=your_database_name

    # Database URL
    DATABASE_URL=postgresql://your_postgres_user:your_postgres_password@localhost:5432/your_database_name
    ```

4. **Migrate the database schema:**

    ```sh
    npx prisma migrate dev --name init
    ```

5. **Start the server:**

    ```sh
    npm run dev
    # or
    yarn dev
    ```

    The server should now be running at `http://localhost:3000`.

## Usage

Once the server is running, you can use tools like Postman or curl to interact with the API endpoints. Ensure to include JWT tokens in the `Authorization` header for protected routes.

## API Endpoints

Here are some example endpoints for the CRUD operations and authentication:

- `POST /register` - Register a new user
- `POST /login` - Authenticate a user and receive a JWT
- `GET /users` - Get a list of items (protected)
- `GET /users/:id` - Get a specific item by ID (protected)
- `PUT /users/:id` - Update a specific item by ID (protected)
- `DELETE /users/:id` - Delete a specific item by ID (protected)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [danielgarrido425@gmail.com](mailto:danielgarrido425@gmail.com)

Project Link: [https://github.com/danieljml/SecureREST](https://github.com/danieljml/SecureREST)
