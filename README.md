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
├── vercel.json             # Configuration file for Vercel deployment
└── README.md               # This documentation file
```

## 🛠️ Technologies Used

- **HTML5:** Semantic structure and accessibility.
- **CSS3:** Custom CSS variables (design tokens), flexbox/grid layouts, responsive media queries, and keyframe animations. (No external CSS frameworks).
- **JavaScript (ES6+):** Pure vanilla JS for DOM manipulation, event delegation, and state management.

---

## 💻 How to Run Locally

You do not need any complex backend to run this application! Here are a few simple ways to get it running on your computer:

### Option 1: Using a Local Development Server (Recommended)
Running a local server ensures that all assets load exactly as they would on a real website. 

1. Ensure you have [Node.js](https://nodejs.org/) installed on your computer.
2. Open your terminal and navigate to the project folder (`task3`).
3. Run the following command:
   ```bash
   npx serve public
   ```
4. Open your web browser and go to the link provided in the terminal (usually `http://localhost:3000`).

### Option 2: The Quick Way (Direct Browser Opening)
Because this is a pure frontend app, you can simply open the HTML file directly in your web browser.

1. Open your File Explorer.
2. Navigate inside the `task3/public` folder.
3. Double-click the `index.html` file.
   *(Alternatively, right-click `index.html` -> Open With -> Google Chrome / Edge / Safari).*

### Option 3: Using VS Code Live Server
If you use Visual Studio Code as your code editor:
1. Install the **Live Server** extension.
2. Open `public/index.html` in VS Code.
3. Click the "Go Live" button at the bottom right corner of the VS Code window.

---

## 🌐 How to Deploy to Vercel

This project includes a `vercel.json` file, which makes it incredibly easy to deploy to Vercel. The configuration automatically routes visitors to the `public/index.html` file.

1. Push this project folder to a GitHub repository.
2. Go to [Vercel.com](https://vercel.com/) and sign in.
3. Click **Add New** -> **Project**.
4. Import your GitHub repository.
5. Leave all settings as default and click **Deploy**.
6. Within seconds, your app will be live on the internet!
