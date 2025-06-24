# MacroTracker – Indian Gym Guide

**MacroTracker** is a full-stack MERN (MongoDB, Express, React, Node.js) application that provides personalized Indian meal plans and workout routines based on user profiles and fitness goals. It leverages Google Gemini AI for generating custom diet plans with precise macros.

---

## Features

- **Personalized Nutrition:** Indian meal plans tailored to user macros and preferences.
- **Custom Workouts:** Gym routines based on experience and fitness goals.
- **Progress Tracking:** Downloadable PDF reports of your fitness plan.
- **Modern UI:** Built with React, Tailwind CSS, and component libraries.
- **AI Integration:** Uses Google Gemini API for generating diet plans.

---

## Folder Structure

```
india-gym-guide/
├── public/                 # Static assets (icons, manifest, etc.)
├── server/                 # Express backend (controllers, routes, utils)
├── src/                    # React frontend source code
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components (Index, Dashboard, etc.)
│   ├── types/              # TypeScript types/interfaces
│   ├── App.tsx             # Main React app
│   └── main.tsx            # React entry point
├── package.json            # Project dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── vite.config.ts          # Vite build tool config
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (v9+) or **yarn**
- **MongoDB** (local or Atlas cloud instance)
- **Google Gemini API Key** (for AI diet plan generation)

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/india-gym-guide.git
cd india-gym-guide
```

### 2. Install Dependencies

```sh
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory for backend secrets:

```
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
```

> **Note:**  
> The Gemini API key is currently hardcoded in [`GeminiService.ts`](src/services/GeminiService.ts).  
> For production, move it to environment variables for security.

### 4. Start MongoDB

- If running locally, start your MongoDB server:
  ```sh
  mongod
  ```

### 5. Start the Backend Server

```sh
cd server
npm install
npm run dev
# or
yarn dev
```

- The backend should run on `http://localhost:5000` (or your configured port).

### 6. Start the Frontend

Open a new terminal in the project root:

```sh
npm run dev
# or
yarn dev
```

- The frontend will run on `http://localhost:5173` (default Vite port).

---

## Usage

1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Click **Get Started - Create Your Profile**.
3. Fill in your fitness profile and submit.
4. View your personalized dashboard with AI-generated meal plans and workouts.

---

## Customization

- **API Keys:**  
  Update your Gemini API key in the `.env` file and refactor [`GeminiService.ts`](src/services/GeminiService.ts) to read from environment variables.
- **Styling:**  
  Modify `tailwind.config.ts` and CSS files for custom themes.
- **Backend Logic:**  
# MacroTracker – Indian Gym Guide

**MacroTracker** is a full-stack MERN (MongoDB, Express, React, Node.js) application that provides personalized Indian meal plans and workout routines based on user profiles and fitness goals. It leverages Google Gemini AI for generating custom diet plans with precise macros.

---

## Features

- **Personalized Nutrition:** Indian meal plans tailored to user macros and preferences.
- **Custom Workouts:** Gym routines based on experience and fitness goals.
- **Progress Tracking:** Downloadable PDF reports of your fitness plan.
- **Modern UI:** Built with React, Tailwind CSS, and component libraries.
- **AI Integration:** Uses Google Gemini API for generating diet plans.

---

## Folder Structure

```
india-gym-guide/
├── public/                 # Static assets (icons, manifest, etc.)
├── server/                 # Express backend (controllers, routes, utils)
├── src/                    # React frontend source code
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components (Index, Dashboard, etc.)
│   ├── types/              # TypeScript types/interfaces
│   ├── App.tsx             # Main React app
│   └── main.tsx            # React entry point
├── package.json            # Project dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── vite.config.ts          # Vite build tool config
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (v9+) or **yarn**
- **MongoDB** (local or Atlas cloud instance)
- **Google Gemini API Key** (for AI diet plan generation)

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/india-gym-guide.git
cd india-gym-guide
```

### 2. Install Dependencies

```sh
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory for backend secrets:

```
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
```

> **Note:**  
> The Gemini API key is currentlycoded in [`GeminiService.ts`](src/services/GeminiService.ts).  
> For production, move it to environment variables for security.

### 4. Start MongoDB

- If running locally, start your MongoDB server:
  ```sh
  mongod
  ```

### 5. Start the Backend Server

```sh
cd server
npm install
npm run dev
# or
yarn dev
```

- The backend should run on `http://localhost:5000` (or your configured port).

### 6. Start the Frontend

Open a new terminal in the project root:

```sh
npm run dev
# or
yarn dev
```

- The frontend will run on `http://localhost:5173` (default Vite port).

---

## Usage

1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Click **Get Started - Create Your Profile**.
3. Fill in your fitness profile and submit.
4. View your personalized dashboard with AI-generated meal plans and workouts.

---

## Customization

- **API Keys:**  
  Update your Gemini API key in the `.env` file and refactor [`GeminiService.ts`](src/services/GeminiService.ts) to read from environment variables.
- **Styling:**  
  Modify `tailwind.config.ts` and CSS files for custom themes.
- **Backend Logic:**  