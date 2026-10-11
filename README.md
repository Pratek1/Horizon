# 🏡 Horizon

> A full-stack Airbnb-inspired property listing web application where users can browse, create, edit, and review travel listings — complete with user authentication and cloud image uploads.

---

## ✨ Features

- 🔐 **User Authentication** — Sign up, log in, log out (Passport.js + passport-local-mongoose)
- 🏘️ **Listing Management** — Create, read, update, and delete property listings
- 🖼️ **Cloud Image Upload** — Images stored on Cloudinary via Multer
- ⭐ **Reviews** — Authenticated users can leave and delete reviews on listings
- 🛡️ **Authorization** — Only listing owners can edit/delete their listings; only review authors can delete their reviews
- ✅ **Server-side Validation** — Joi schema validation on all forms
- 💬 **Flash Messages** — Success and error feedback on every action
- 🐳 **Docker Ready** — One-command setup with Docker Compose

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js 20 |
| **Framework** | Express.js 4 |
| **Templating** | EJS + ejs-mate (layouts) |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | Passport.js + passport-local-mongoose |
| **File Upload** | Multer + multer-storage-cloudinary |
| **Cloud Storage** | Cloudinary |
| **Validation** | Joi |
| **Session** | express-session + connect-flash |
| **Container** | Docker + Docker Compose |

---

## 📁 Project Structure

```
Horizon/
├── app.js                  # Entry point — Express app setup, middleware, routes
├── cloudConfig.js          # Cloudinary + Multer storage configuration
├── middleware.js           # Custom middleware (auth guards, validation, ownership)
├── schema.js               # Joi validation schemas (listing, review)
├── package.json
│
├── model/                  # Mongoose models
│   ├── listings.js         # Listing schema (title, description, image, price, location, owner, reviews)
│   ├── review.js           # Review schema (comment, rating, author)
│   └── user.js             # User schema (email) + passport-local-mongoose plugin
│
├── routes/                 # Express routers
│   ├── listing.js          # /listings — CRUD routes
│   ├── review.js           # /listings/:id/reviews — review routes
│   └── user.js             # /signup, /login, /logout
│
├── controller/             # Route handler logic (MVC pattern)
│   ├── listingController.js
│   ├── reviewController.js
│   └── userController.js
│
├── utils/                  # Helpers
│   ├── ExpressError.js     # Custom error class
│   └── wrapAsync.js        # Async error wrapper
│
├── init/                   # Database seed scripts
│   ├── data.js             # Sample listings data
│   └── index.js            # Seed script
│
├── views/                  # EJS templates
│   ├── layouts/
│   ├── listings/
│   └── users/
│
├── public/                 # Static assets (CSS, JS, images)
│
├── Dockerfile
├── docker-compose.yml
├── .env.example            # Environment variable template (safe to commit)
├── .gitignore
└── README.md
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUD_API_KEY` | Your Cloudinary API key |
| `CLOUD_API_SECRET` | Your Cloudinary API secret |
| `MONGO_URL` | MongoDB connection string (default: `mongodb://127.0.0.1:27017/airbnb`) |
| `SESSION_SECRET` | A long, random secret string for express-session |

> Get Cloudinary credentials at [cloudinary.com](https://cloudinary.com) → Dashboard.

---

## 🚀 Getting Started

### Option A — Local Development (without Docker)

**Prerequisites:** Node.js ≥ 18, MongoDB running locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/Horizon.git
cd Horizon

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and fill in your Cloudinary credentials and SESSION_SECRET

# 4. (Optional) Seed the database with sample listings
node init/index.js

# 5. Start the server
npm start
```

Open **http://localhost:8080/listings** in your browser.

---

### Option B — Docker Compose (recommended)

**Prerequisites:** [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```bash
# 1. Clone the repository
git clone https://github.com/your-username/Horizon.git
cd Horizon

# 2. Set up environment variables
cp .env.example .env
# Edit .env and fill in your Cloudinary credentials and SESSION_SECRET

# 3. Build and start all services (app + MongoDB)
docker compose up --build
```

Open **http://localhost:8080/listings** in your browser.

To stop:
```bash
docker compose down
```

To also remove the MongoDB volume (fresh DB):
```bash
docker compose down -v
```

---

## 🗂️ API / Routes Overview

### Listings

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/listings` | Browse all listings |
| GET | `/listings/new` | New listing form |
| POST | `/listings` | Create a listing |
| GET | `/listings/:id` | View a listing |
| GET | `/listings/:id/edit` | Edit form |
| PUT | `/listings/:id` | Update a listing |
| DELETE | `/listings/:id` | Delete a listing |

### Reviews

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/listings/:id/reviews` | Add a review |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review |

### Users

| Method | Route | Description |
|--------|-------|-------------|
| GET/POST | `/signup` | Register |
| GET/POST | `/login` | Log in |
| GET | `/logout` | Log out |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---
