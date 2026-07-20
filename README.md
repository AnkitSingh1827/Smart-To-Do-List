# TaskFlow — Smart To-Do List 📝✨

A modern, responsive, and feature-rich To-Do List web application built with pure HTML, CSS, and JavaScript. This project is designed to be production-ready with a beautiful UI, smooth animations, and local storage support so you never lose your tasks.

## 🚀 Features

- **Add, Edit, & Delete Tasks:** Easily manage your daily to-dos.
- **Mark as Completed:** Check off tasks as you finish them.
- **Data Persistence:** Uses `LocalStorage` to save your tasks automatically. Your list stays exactly as you left it, even if you refresh or close the browser!
- **Dark & Light Mode:** Seamlessly toggle between themes. The app remembers your preference.
- **Smart Filters:** Quickly view "All", "Pending", or "Completed" tasks.
- **Task Counter:** Keep track of your productivity with dynamic task counters.
- **Clear Completed:** One-click button to clean up your finished tasks.
- **Responsive Design:** Looks great and works perfectly on mobile phones, tablets, and desktop computers.
- **Modern UI:** Features glassmorphism effects, smooth micro-animations, and animated background blobs.

## 📁 Project Structure

This project is structured for easy local development and seamless deployment (e.g., to Vercel).

```text
task3/
├── public/                 # Contains all public-facing assets
│   ├── index.html          # Main HTML structure
│   ├── style.css           # Styling, themes, and animations
│   └── script.js           # Core logic and local storage management
└── README.md               # This documentation file
```

## 🛠️ Technologies Used

- **HTML5:** Semantic structure and accessibility.
- **CSS3:** Custom CSS variables (design tokens), flexbox/grid layouts, responsive media queries, and keyframe animations. (No external CSS frameworks).
- **JavaScript (ES6+):** Pure vanilla JS for DOM manipulation, event delegation, and state management.

---

## 💻 How to Run Locally (quick)

This is a static, frontend-only app. The easiest way to run it is to serve the files from the `public` folder using Python.

### Copy/paste terminal commands

If you are already inside the project folder, run:

```powershell
cd public
py -3 -m http.server 8000
```

If you are in the parent workspace folder, run:

```powershell
cd task3/public
py -3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000/
```

### Option A — Run from the terminal (recommended)

1. Open PowerShell in the project folder.
2. Run:

```powershell
cd public
py -3 -m http.server 8000
```

3. Open this address in your browser:

```text
http://127.0.0.1:8000/
```

If `py` is not available on your machine, try:

```powershell
python -m http.server 8000
```

### Option B — Run from the workspace root

If you are in the parent folder of this project, use:

```powershell
cd task3/public
py -3 -m http.server 8000
```

### Option C — Open directly

You can also double-click `public/index.html`, but using a local server is recommended for the best experience.

### Option D — VS Code Live Server

1. Install the "Live Server" extension in VS Code.
2. Open `public/index.html` and click "Go Live".

   - - ## 👩‍💻 Author

*Ankit Singh*  
[GitHub](https://github.com/AnkitSingh1827) | [LinkedIn](https://www.linkedin.com/in/ankit-singh257)

Troubleshooting:

---
