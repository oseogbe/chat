# Chat

Welcome to Chat! This is a real-time chat application with a Node.js/Express.js backend and a Next.js frontend.
The application integrates Socket.IO for real-time communication.

## Project Structure

```
/chat
    ├── backend
    └── client
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Backend Setup

1. Navigate to the `backend` directory:
        ```bash
        cd backend
        ```

2. Install the dependencies:
        ```bash
        npm install
        ```

3. Create a `.env` file in the `backend` directory and add your environment variables:
        ```
        PORT=3001
        DATABASE_URL=your_database_url
        ```

4. Start the backend server:
        ```bash
        npm start
        ```

### Client Setup

1. Navigate to the `client` directory:
        ```bash
        cd ../client
        ```

2. Install the dependencies:
        ```bash
        npm install
        ```

3. Create a `.env.local` file in the `client` directory and add your environment variables:
        ```
        NEXT_PUBLIC_API_URL=http://localhost:3001
        ```

4. Start the Next.js development server:
        ```bash
        npm run dev
        ```

### Running the Application

1. Ensure both the backend and client servers are running.
2. Open your browser and navigate to `http://localhost:3001` to access the chat application.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Contact

For any inquiries, please contact [osememen.ogbe@example.com].
