# OctoFit Tracker Backend

Node.js + Express + TypeScript + MongoDB backend for the OctoFit Tracker application.

## Configuration

### Ports
- **Backend API**: 8000
- **MongoDB**: 27017

### Environment Variables
See `.env` file for configuration:
- `PORT`: Backend server port (default: 8000)
- `NODE_ENV`: Environment mode (default: development)
- `MONGODB_URI`: MongoDB connection URI (default: mongodb://localhost:27017/octofit-tracker)
- `CORS_ORIGIN`: Frontend CORS origin (default: http://localhost:5173)

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

The dev server will start on http://localhost:8000 with hot-reload via nodemon.

## Build

```bash
npm run build
```

## Production

```bash
npm start
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: CORS middleware
- **dotenv**: Environment configuration

## Dev Dependencies

- **typescript**: TypeScript compiler
- **@types/express**: TypeScript types for Express
- **@types/node**: TypeScript types for Node.js
- **ts-node**: TypeScript execution for Node.js
- **nodemon**: Auto-reload development server
