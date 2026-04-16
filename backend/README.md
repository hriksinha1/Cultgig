# Cultgig Backend - Node.js

This is the Express.js backend for the Cultgig platform, replacing the previous FastAPI implementation.

## Why Node.js?

**Advantages over Python/FastAPI:**

- **Unified JavaScript Stack**: Frontend (React) and backend both use JavaScript/TypeScript, enabling code sharing & consistent developer experience
- **NPM Ecosystem**: Massive package ecosystem with high-quality, frequently updated libraries
- **Performance**: Node.js is optimized for I/O-heavy operations (database queries, API calls)
- **Scalability**: Better horizontal scaling with built-in clustering support
- **Development Speed**: Faster development cycle with live reloading (nodemon)
- **Single Language**: Reduce context switching for full-stack developers
- **Better for Real-time**: WebSockets & real-time features are more natural in Node.js
- **Enterprise Ready**: Used by Netflix, LinkedIn, Uber, PayPal, and thousands of enterprises

## Stack

- **Express.js** - Lightweight HTTP server framework
- **MongoDB** - NoSQL database driver
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique ID generation
- **Dotenv** - Environment variable management
- **Nodemon** - Auto-restart on file changes (dev only)

## Setup

### Prerequisites
- Node.js 16+ installed
- MongoDB instance running
- `.env` file with credentials

### Installation

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=cultgig_db
CORS_ORIGINS=http://localhost:3000,http://localhost:8000
PORT=8000
```

### Running the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on `http://localhost:8000`

## API Endpoints

All endpoints are prefixed with `/api/`

### GET /api/
Health check endpoint
```bash
curl http://localhost:8000/api/
```
Response:
```json
{ "message": "Hello World" }
```

### POST /api/status
Create a status check record
```bash
curl -X POST http://localhost:8000/api/status \
  -H "Content-Type: application/json" \
  -d '{"client_name": "Web Client"}'
```

### GET /api/status
Retrieve all status checks
```bash
curl http://localhost:8000/api/status
```

## Project Structure

```
backend/
├── server.js           # Main server file
├── package.json        # Dependencies and scripts
├── .env               # Environment variables (create this)
└── requirements.txt   # Legacy Python requirements (deprecated)
```

## CORS Configuration

The server accepts CORS requests from origins specified in `CORS_ORIGINS` environment variable.
Default allows all origins (`*`) if not specified.

## Logging

All requests are logged with timestamp, method, and path:
```
2026-04-10T13:45:22.123Z - POST /api/status
```

## Comparison with FastAPI

| Feature | FastAPI | Express.js |
|---------|---------|-----------|
| Runtime | Python | Node.js |
| Framework | Async-first | Event-driven |
| Database | Motor (async) | MongoDB driver |
| Startup Time | ~500ms | ~100ms |
| Package Manager | pip | npm |
| Learning Curve | Moderate | Easier for JS devs |
| Community Size | Growing | Very large |

## Migration Notes

- All FastAPI endpoints mapped 1:1 to Express.js routes
- Same CORS configuration as before
- Same MongoDB operations (find, insert, project)
- Database collection names remain `status_checks`
- Response formats unchanged for frontend compatibility

## Contributing

Ensure code follows consistent style:
- Use ES6+ syntax
- Add logging for debugging
- Handle errors gracefully
- Document new endpoints
