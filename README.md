# **EventPlus – Frontend**

A modern, responsive web application that lets users discover and track hackathons and tech events from **Devfolio**, **Unstop**, and **Devpost** in one unified dashboard.

---

## 🚀 Features

* **Unified Event Feed**: Aggregates events from multiple platforms into a single timeline.
* **Intelligent Filters**: Filter by platform, event type, keywords, and deadlines.
* **Real-Time Refresh**: Pull the latest events on demand.
* **Responsive Design**: Mobile-first layout with a vibrant pink/rose gradient.
* **Fast Performance**: Vite-powered builds for lightning-fast load times.
* **Modern UI**: Clean interface with Tailwind styling and smooth transitions.

---

## 🛠️ Languages & Technologies

### Core Languages

* **JavaScript (ES6+)**: Primary scripting language.
* **HTML5**: Semantic markup.
* **CSS3**: Modern styling with custom utilities.
* **JSX/TSX**: React component syntax.

### Frontend Framework & Library

* **React 18**: Component-based UI with hooks.
* **Vite**: Next-generation build tool for rapid development.
* **React Router DOM v6**: SPA routing.

### Styling & UI

* **Tailwind CSS**: Utility-first styling.
* **PostCSS & Autoprefixer**: Modern CSS tooling.

### HTTP & Data

* **Axios**: Promise-based HTTP client for API requests.

---

## 📋 Prerequisites

* **Node.js** v16 or higher
* **npm** or **yarn** package manager

---

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/eventplus-frontend.git
   cd eventplus-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the project root:

   ```ini
   # Development
   VITE_BACKEND_URL=http://localhost:5000/api

   # Production (example)
   # VITE_BACKEND_URL=https://your-backend-domain.com/api
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app runs at **[http://localhost:5173](http://localhost:5173)**

---

## 🏗️ Build for Production

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
```

---

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── EventCard.jsx         # Individual event UI
│   │   ├── FilterBar.jsx         # Filters & search
│   │   └── Navbar.jsx            # Top navigation
│   ├── pages/
│   │   ├── HomePage.jsx          # Main events page
│   │   └── AboutPage.jsx         # About/Info page
│   ├── lib/
│   │   └── api.js                # Axios configuration
│   ├── App.jsx                   # Root app component
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Entry point
├── public/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:

   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit changes:

   ```bash
   git commit -m "Add AmazingFeature"
   ```
4. Push to the branch:

   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📞 Support
Built with ❤️ by **Mrunal Mehar**.

---
