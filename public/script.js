/**
 * TaskFlow — script.js
 * Pure-frontend To-Do List with LocalStorage, filters, dark mode, CRUD
 */

/* ═══════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════ */
const STORAGE_KEY = 'taskflow_tasks';
const THEME_KEY   = 'taskflow_theme';

let tasks        = [];
let activeFilter = 'all';
let editingId    = null;

/* ═══════════════════════════════════════════════
   DOM REFS
═══════════════════════════════════════════════ */
const taskForm          = document.getElementById('task-form');
const taskInput         = document.getElementById('task-input');
const charCount         = document.getElementById('char-count');
const taskList          = document.getElementById('task-list');
const emptyState        = document.getElementById('empty-state');
const themeToggle       = document.getElementById('theme-toggle');
const filterBtns        = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const modalBackdrop     = document.getElementById('modal-backdrop');
const editInput         = document.getElementById('edit-input');
const modalCancel       = document.getElementById('modal-cancel');
const modalSave         = document.getElementById('modal-save');
const toast             = document.getElementById('toast');
const countTotal        = document.getElementById('count-total');
const countPending      = document.getElementById('count-pending');
const countDone         = document.getElementById('count-done');

/* ═══════════════════════════════════════════════
   UTILS
═══════════════════════════════════════════════ */
/** Generate a unique ID */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/** Format a Date object as a short human-readable string */
function fmtDate(ts) {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now - d;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1)  return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24)  return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7)  return `${diffDay}d ago`;
  return d.toLocaleDateString('en-GB', { day:'numeric', month:'short' });
}

/** Escape HTML to prevent XSS */
function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ═══════════════════════════════════════════════
   PERSISTENCE
═══════════════════════════════════════════════ */
function loadTasks() {
  try {
    tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    tasks = [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/* ═══════════════════════════════════════════════
   THEME
═══════════════════════════════════════════════ */
function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(saved || preferred);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/* ═══════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════ */
let toastTimer = null;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ═══════════════════════════════════════════════
   RENDER
═══════════════════════════════════════════════ */
function getFilteredTasks() {
  switch (activeFilter) {
    case 'pending':   return tasks.filter(t => !t.completed);
    case 'completed': return tasks.filter(t => t.completed);
    default:          return [...tasks];
  }
}

function updateStats() {
  const total   = tasks.length;
  const done    = tasks.filter(t => t.completed).length;
  const pending = total - done;
  animateNumber(countTotal,   total);
  animateNumber(countPending, pending);
  animateNumber(countDone,    done);
}

/** Briefly scale the number when it changes */
function animateNumber(el, value) {
  if (el.textContent !== String(value)) {
    el.textContent = value;
    el.style.transform = 'scale(1.3)';
    setTimeout(() => (el.style.transform = ''), 200);
  }
}

function renderTasks() {
  const filtered = getFilteredTasks();

  if (filtered.length === 0) {
    taskList.innerHTML = '';
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
    taskList.innerHTML = filtered.map(buildTaskHTML).join('');
  }

  updateStats();
}

function buildTaskHTML(task) {
  const checked   = task.completed ? '✓' : '';
  const completed = task.completed ? 'completed' : '';
  const date      = fmtDate(task.createdAt);

  return `
    <li class="task-item ${completed}" data-id="${task.id}" role="listitem">
      <button
        class="task-checkbox"
        aria-label="${task.completed ? 'Mark as pending' : 'Mark as completed'}"
        data-action="toggle"
      >${checked}</button>

      <span class="task-text">${escHtml(task.text)}</span>

      <span class="task-meta" aria-label="Created ${date}">${date}</span>

      <div class="task-actions" role="group" aria-label="Task actions">
        <button class="action-btn btn-edit"   data-action="edit"   aria-label="Edit task" title="Edit">✏️</button>
        <button class="action-btn btn-delete" data-action="delete" aria-label="Delete task" title="Delete">🗑️</button>
      </div>
    </li>
  `;
}

/* ═══════════════════════════════════════════════
   CRUD OPERATIONS
═══════════════════════════════════════════════ */
function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const task = {
    id:        uid(),
    text:      trimmed,
    completed: false,
    createdAt: Date.now(),
  };

  tasks.unshift(task); // newest first
  saveTasks();
  renderTasks();
  showToast('✅ Task added!');
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  task.completed = !task.completed;
  saveTasks();
  renderTasks();
  showToast(task.completed ? '🎉 Task completed!' : '🔄 Marked as pending');
}

function deleteTask(id) {
  // Animate out first
  const el = taskList.querySelector(`[data-id="${id}"]`);
  if (el) {
    el.classList.add('removing');
    el.addEventListener('animationend', () => {
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
      renderTasks();
    }, { once: true });
  } else {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
  }
  showToast('🗑️ Task deleted');
}

function startEdit(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  editingId = id;
  editInput.value = task.text;
  modalBackdrop.hidden = false;
  requestAnimationFrame(() => editInput.focus());
}

function saveEdit() {
  const trimmed = editInput.value.trim();
  if (!trimmed || !editingId) return;
  const task = tasks.find(t => t.id === editingId);
  if (task) {
    task.text = trimmed;
    saveTasks();
    renderTasks();
    showToast('✏️ Task updated!');
  }
  closeModal();
}

function closeModal() {
  modalBackdrop.hidden = true;
  editingId = null;
  editInput.value = '';
}

function clearCompleted() {
  const count = tasks.filter(t => t.completed).length;
  if (count === 0) { showToast('No completed tasks to clear'); return; }
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
  showToast(`🧹 Cleared ${count} completed task${count > 1 ? 's' : ''}`);
}

/* ═══════════════════════════════════════════════
   EVENTS
═══════════════════════════════════════════════ */

// ── Form submit ──
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const val = taskInput.value;
  if (!val.trim()) {
    taskInput.style.borderColor = '#ff5c6a';
    setTimeout(() => (taskInput.style.borderColor = ''), 1000);
    return;
  }
  addTask(val);
  taskInput.value = '';
  charCount.textContent = '';
  taskInput.focus();
});

// ── Character counter ──
taskInput.addEventListener('input', () => {
  const len = taskInput.value.length;
  const max = Number(taskInput.maxLength);
  if (len === 0) {
    charCount.textContent = '';
    charCount.className = 'char-count';
    return;
  }
  charCount.textContent = `${len} / ${max}`;
  if (len >= max - 10) {
    charCount.className = 'char-count danger';
  } else if (len >= max * 0.75) {
    charCount.className = 'char-count warn';
  } else {
    charCount.className = 'char-count';
  }
});

// ── Task list (event delegation) ──
taskList.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const li = btn.closest('[data-id]');
  if (!li) return;
  const id = li.dataset.id;

  switch (btn.dataset.action) {
    case 'toggle': toggleTask(id); break;
    case 'edit':   startEdit(id);  break;
    case 'delete': deleteTask(id); break;
  }
});

// ── Keyboard shortcut: Enter on task item checks it ──
taskList.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const btn = e.target.closest('.task-checkbox');
    if (btn) btn.click();
  }
});

// ── Filter buttons ──
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderTasks();
  });
});

// ── Clear completed ──
clearCompletedBtn.addEventListener('click', clearCompleted);

// ── Theme toggle ──
themeToggle.addEventListener('click', toggleTheme);

// ── Modal: cancel & backdrop click ──
modalCancel.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeModal();
});

// ── Modal: save ──
modalSave.addEventListener('click', saveEdit);

// ── Modal: save on Ctrl+Enter ──
editInput.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') saveEdit();
  if (e.key === 'Escape') closeModal();
});

// ── Global Escape key ──
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalBackdrop.hidden) closeModal();
});

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
(function init() {
  loadTheme();
  loadTasks();
  renderTasks();

  // Seed demo tasks if brand new
  if (tasks.length === 0) {
    const demos = [
      'Welcome to TaskFlow! 👋 Click the checkbox to complete a task.',
      'Try editing this task by hovering and clicking ✏️',
      'Use the filters above to view All, Pending, or Completed tasks.',
      'Toggle dark mode with the button in the top-right corner 🌙',
    ];
    demos.forEach((text, i) => {
      tasks.push({
        id:        uid(),
        text,
        completed: i === 0, // first demo task is completed
        createdAt: Date.now() - (demos.length - i) * 60000,
      });
    });
    saveTasks();
    renderTasks();
  }
})();
