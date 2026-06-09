# OctoFit Tracker

A modern multi-tier web application for fitness tracking.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite frontend (Port: 5173)
├── backend/           # Node.js + Express + TypeScript API (Port: 8000)
└── README.md          # This file
```

## Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB (running on port 27017)

## Quick Start

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend API will be available at `http://localhost:8000`

## Configuration

### Frontend
- **Port**: 5173
- **Framework**: React 19
- **Build Tool**: Vite

### Backend
- **Port**: 8000
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Database ORM**: Mongoose

### Database
- **MongoDB**: Port 27017
- **Default URI**: mongodb://localhost:27017/octofit-tracker

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server with hot-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

## Documentation

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
