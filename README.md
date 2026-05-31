# I Love Game App

A full-stack single-page application for discovering, sharing, and discussing video games. Built as part of the **SoftUni ReactJS** course.

---

## Features

- **Browse** a catalog of all available games
- **Latest Games** section on the home page (most recently added, top 3)
- **User Authentication** — register, login, logout with custom token-based auth
- **Game Management** — authenticated users can create, edit, and delete their own games
- **Comments** — authenticated users can leave comments on any game detail page
- **Optimistic UI** — comments appear instantly using React 19's `useOptimistic` before the server confirms the request
- **Notifications** — toast notifications via `react-toastify` and confirmation dialogs via `sweetalert2`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 19 + Vite |
| Routing | React Router v7 |
| State management | React Context API (`UserContext`) |
| Notifications | react-toastify, sweetalert2 |
| Image storage | Firebase Storage |
| ID generation | uuid |
| Backend | Custom Node.js HTTP server |
| Auth | Custom token-based (`X-Authorization` header) |

---

## Project Structure

```
softuni-react-i-love-game-app/
├── client/                     # React SPA (Vite)
│   ├── public/
│   │   ├── images/             # Static assets
│   │   └── styles/             # Global CSS files
│   └── src/
│       ├── components/
│       │   ├── catalog/        # All games listing
│       │   ├── create-comment/ # Comment form
│       │   ├── details/        # Game detail page + comments
│       │   ├── footer/
│       │   ├── game-card/      # Reusable game card component
│       │   ├── game-create/    # Add new game form
│       │   ├── game-edit/      # Edit existing game form
│       │   ├── game-details-comments/
│       │   ├── header/
│       │   ├── home/           # Latest games page
│       │   ├── login/
│       │   ├── logout/
│       │   └── register/
│       ├── contexts/
│       │   └── UserContext.jsx # Global auth state
│       ├── hooks/
│       │   ├── useForm.js      # Form binding + submit handler
│       │   ├── useLocalStorage.js
│       │   └── useRequest.js   # Fetch wrapper with auth injection
│       ├── App.jsx             # Route definitions
│       └── main.jsx
└── server/
    └── server.js               # Node.js HTTP backend (port 3030)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ValeriCodeU/softuni-react-i-love-game-app.git
cd softuni-react-i-love-game-app

# Install client dependencies
cd client
npm install
```

### Environment Variables

Copy the example env file and fill in your Firebase credentials (required only for image upload):

```bash
cp client/.env.example client/.env
```

| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase project API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

### Running the App

Open two terminals:

```bash
# Terminal 1 — start the backend (from project root)
node server/server.js

# Terminal 2 — start the frontend (from client/)
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3030`.

---

## Key Abstractions

### `useRequest(url, initialValues)`

Central data-fetching hook. On mount it GETs `url` and stores the result. Exposes `{ data, setData, request }` for imperative calls. Automatically injects the `X-Authorization` header when a user is logged in.

### `useForm(submitHandler, initialValues)`

Binds form fields through `register('fieldName')` (returns `name`, `value`, `onChange`). Calls `submitHandler` with the collected values on submit, then resets the form.

### `useLocalStorage(key, initialValue)`

`useState` backed by `localStorage`. Used to persist the authenticated user across page refreshes.

### `UserContext`

Single global context that holds the logged-in user object and exposes `registerHandler`, `loginHandler`, and `logoutHandler`. Authentication state is derived as `!!user?.accessToken`.

---

## Authentication Flow

1. `POST /users/register` or `POST /users/login` returns `{ email, _id, _createdOn, accessToken }`.
2. The token is stored in `localStorage` under the key `'user'` via `useLocalStorage`.
3. Every subsequent request includes `X-Authorization: <accessToken>` injected by `useRequest`.
4. Logout calls `POST /users/logout` and then clears the stored user.

---

## Optimistic Comments

The game details page uses React 19's `useOptimistic` to display new comments immediately before the server responds:

1. `onCreateStart` — dispatches `ADD_COMMENT` with a temporary UUID-keyed comment.
2. `onCreateEnd` — dispatches `REPLACE_COMMENT`, swapping the temp entry with the confirmed server response.
3. `onCreateFail` — dispatches `REMOVE_COMMENT` to roll back on error.

---

## Available Scripts

Run these from the `client/` directory:

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run api` | Start Firebase functions emulator |

---

## License

This project was created for educational purposes as part of the [SoftUni](https://softuni.bg/) ReactJS course.
