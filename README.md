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

This is a static, frontend-only app. Pick one simple option below and run the shown commands in your terminal.

Option A — Recommended (quick HTTP server using Python 3):

1. Open PowerShell or any terminal and run:

```powershell
cd public
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

If `python` isn't available on Windows, try:

```powershell
py -3 -m http.server 8000
```

Option B — Node.js (one-liner):

```powershell
npx serve public
# open the URL shown by the command (usually http://localhost:3000)
```

Option C — Quick file open (no server):

Open the folder and double-click `index.html` (works for basic usage but some browser features prefer a local server).

Option D — VS Code Live Server:

1. Install the "Live Server" extension in VS Code.
2. Open `public/index.html` and click "Go Live".

Troubleshooting:

- If pages look blank, make sure you opened `public/index.html` (not a parent folder file).
- If the server command errors, ensure Python or Node.js is installed and the terminal's current directory is the project folder.
- Use `start http://localhost:8000` (PowerShell) to automatically open the browser.
---

## 🌐 How to Deploy to Vercel

This project includes a `vercel.json` file, which makes it incredibly easy to deploy to Vercel. The configuration automatically routes visitors to the `public/index.html` file.

