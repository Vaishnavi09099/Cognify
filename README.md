# Learnify

> An AI-powered learning platform that transforms your documents into interactive study tools — flashcards, quizzes, and more.

---

## ✨ Features

- 📄 **Document Upload** — Upload your PDFs and study material
- 🃏 **AI Flashcards** — Auto-generate flashcard sets from your documents
- ⭐ **Star Cards** — Mark important flashcards for quick review
- 🗑️ **Manage Sets** — Create and delete flashcard sets easily
- 🔐 **Authentication** — Secure login and signup with JWT

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS**
- **Axios**
- **React Hot Toast**
- **Lucide React**

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** (Authentication)
- **Google Gemini API** (AI Generation)

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account
- Google Gemini API key

---

### 1. Clone the Repository

```bash
git clone https://github.com/Vaishnavi09099/Cognify.git
cd Cognify
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

---

### 4. Open in Browser

```
http://localhost:5173
```

---

## 🌐 Deployment

| Service | Platform |
|--------|----------|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | [MongoDB Atlas](https://mongodb.com/atlas) |

---

## 📁 Project Structure

```
Cognify/
├── frontend/         # React app (Vite)
│   └── src/
│       ├── pages/
│       ├── services/
│       └── utils/
├── server/           # Express backend
│   ├── routes/
│   ├── models/
│   └── controllers/
```

---

## 🙋‍♀️ Author

Made with ❤️ by [Vaishnavi](https://github.com/Vaishnavi09099)
## Usage
To start the application:
```bash
npm start
```

## Contributing
We welcome contributions from the community! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get involved.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For support, please reach out to the project maintainers at [insert email/contact link].

## Acknowledgements
Special thanks to all contributors and supporters of this project.
