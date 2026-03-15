# TypeGearUp

TypeGearUp is your free, lightning-fast typing arena — where speed meets precision. Whether you’re a casual typer, a competitive keyboard warrior, or just someone looking to sharpen their skills, TypeGearUp is built for you.

With TypeGearUp, you can:

⚡ Test & boost your typing speed — see how many words you can blaze through in a minute.

😜 Enjoy a super fun and interactive experience — the perfect place to prove you’ve got the fastest fingers around.

📊 Track your progress — see instant results after each test and watch your speed and accuracy soar over time.


Your fingers are your gear — power them up and type your way to the top with TypeGearUp!

## Highlights

- User authentication with JWT.
- Protected typing challenges.
- Real-time typing test results (WPM and accuracy).
- Progress history and stats tracking.
- Clean React frontend with Vite.
- REST API backend with Express and MongoDB.

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Zustand
- Tailwind CSS
- MUI
- Recharts

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt
- CORS

## Project Structure

```text
fasttype/
	backend/
		config/
			db.js
		controller/
		middleware/
		model/
		routes/
		index.js
		package.json
	frontend/
		src/
		public/
		package.json
	README.md
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas account or local MongoDB instance

## Environment Variables

Create two environment files.

### backend/.env

```env
DBI_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=your_secure_secret_here
PORT=3000
```

### frontend/.env

```env
VITE_BASE_URL=http://localhost:3000/api
```

## Installation

Install dependencies in both apps.

```bash
cd backend
npm install
```

```bash
cd ../frontend
npm install
```

## Run Locally

Run backend and frontend in separate terminals.

### 1. Start backend

```bash
cd backend
npm run dev
```

Backend default URL: `http://localhost:3000`

### 2. Start frontend

```bash
cd frontend
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Scripts

### Backend scripts

- `npm run dev` - Start backend with nodemon.
- `npm start` - Start backend with node.

### Frontend scripts

- `npm run dev` - Start Vite dev server.
- `npm run build` - Build production frontend.
- `npm run preview` - Preview production build locally.
- `npm run lint` - Run ESLint.

## API Overview

Base API URL:

```text
http://localhost:3000/api
```

### Auth

- `POST /users/register` - Register user.
- `POST /users/login` - Login user and receive token.

### Typing tests

- `GET /tests/type/all` - Fetch all typing challenges (protected).
- `GET /tests/type/specific/:id` - Fetch one challenge by id (protected).

### User progress

- `POST /users/tests/type/add` - Save typing result (protected).
- `GET /users/tests/fetch` - Fetch current user results (protected).

### Protected route header

```http
Authorization: Bearer <JWT_TOKEN>
```

## Key Data Models

### User

- `name`
- `email` (unique)
- `password` (hashed)

### Test

- `title`
- `difficulty`
- `time`
- `questionString`

### TypingTest

- `userId`
- `testId`
- `wpm`
- `accuracy`
- `difficulty`
- `testDate`

## Frontend Routes

- `/` - Home
- `/login` - Login
- `/register` - Register
- `/challenges` - Challenge list
- `/typing/:id` - Typing test page
- `/stats` - Progress stats
- `/aboutus` - About page
- `/contactus` - Contact page

## Typical User Flow

1. Register or login.
2. Open challenge list.
3. Start a typing test.
4. Submit typing input and get WPM/accuracy.
5. Save result to backend.
6. Review stats on the progress page.

## Troubleshooting

- If login succeeds but protected calls fail, verify Authorization header format.
- If frontend cannot reach backend, confirm `VITE_BASE_URL` and backend port.
- If database fails to connect, re-check `DBI_URI` and network access in MongoDB Atlas.
- If CORS issues appear, confirm backend is running and reachable from frontend origin.

## Deployment Notes

- Deploy backend to a Node-compatible host.
- Deploy frontend to a static host.
- Set `VITE_BASE_URL` in frontend environment to your deployed backend API URL.
- Ensure production `JWT_SECRET` is strong and private.

## Contributing

1. Fork repository.
2. Create feature branch.
3. Commit clear, focused changes.
4. Open a pull request with testing notes.

## License

No license specified yet.

