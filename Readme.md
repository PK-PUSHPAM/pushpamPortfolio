# Portfolio CMS

This project is a full stack portfolio website with an admin panel.

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Auth: JWT

## Project Structure

```txt
portfolio/
├── frontend/
├── backend/
└── README.md
```

## Features

- Dynamic portfolio homepage
- Admin login
- Project CRUD
- Skill CRUD
- Profile management
- Social links management
- Contact form + admin message view

# Setup

## 1. Clone project

> `git clone https://github.com/PK-PUSHPAM/pushpamPortfolio`  
> `cd portfolio`

## 2. Setup backend

> `cd backend`  
> `npm install`  
> `cp .env.example .env`  
> `npm run seed:admin`  
> `npm run dev 3. Setup frontend`  
> `cd ../frontend`  
> `npm install`  
> `cp .env.example .env`  
> `npm run dev`

## 3. Setup frontend

> cd ../frontend  
> npm install  
> cp .env.example .env  
> npm run dev

# Routes

## Public

- /
- /projects
- /projects/:slug

## Admin

- /admin/login
- /admin/dashboard
- /admin/projects
- /admin/skills
- /admin/profile
- /admin/messages
- /admin/social-links

## Notes

- Do not commit .env
- Rotate secrets if exposed
- Add proper deployment URLs before production
