# Full-Stack Note-Taking Application

A full-stack note-taking application built with React, Node.js, Express, and MongoDB.

## Features

- User Sign-Up with Email and OTP  
- JWT-based user authorization for secure actions  
- Create, view, and delete notes after logging in  
- Responsive design for mobile and desktop using Tailwind CSS  
- SPA navigation for Sign-In, Sign-Up, Dashboard using React Router  
- Proper external and internal navigation links  
- Vercel deployment (environment var and asset path handling)  
- Git/GitHub troubleshooting (init, clean commit, branch pushing, rule conflicts)

## Technology Stack

- **Frontend:** React, TypeScript, Vite, Axios, React Router, Tailwind CSS  
- **Backend:** Node.js, Express, TypeScript, Mongoose  
- **Database:** MongoDB  
- **Styling:** Tailwind CSS (CDN)

## Setup and Installation

### Prerequisites
- Node.js  
- MongoDB connection string (Atlas or local)

### Backend Setup
1. `cd backend`
2. `npm install`
3. Add `.env` with `MONGO_URI` and `JWT_SECRET`
4. `npm run dev`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

### Deployment
- Push to a clean GitHub repository (remove `.git` if errors, `git init`, single initial commit, link to new repo).
- Connect to Vercel and configure required environment variables.
- Fixes applied for routing, SPA links, deployment asset loading.

## Project Workflow

- Improved mobile/desktop UI: logo centering, full-width form cards, background image visibility.
- Fixed routing config: SPA flows, React Router v6, export issues.
- Resolved Vercel env/config and asset path errors.
- Handled git/GitHub branch protection and merge issues with a fresh commit workflow.

