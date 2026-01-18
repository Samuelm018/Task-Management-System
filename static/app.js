const API_URL = 'http://127.0.0.1:5000';

// Elements
const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginBox = document.getElementById('login-box');
const registerBox = document.getElementById('register-box');
const authError = document.getElementById('auth-error');
const taskList = document.getElementById('task-list');

// Inputs
const loginUsername = document.getElementById('login-username');
const loginPass = document.getElementById('login-password');
const regUsername = document.getElementById('reg-username');
const regPass = document.getElementById('reg-password');
const taskTitle = document.getElementById('task-title');
const taskDesc = document.getElementById('task-desc');

// State
let token = localStorage.getItem('token');

// Init
if (token) {
    showDashboard();
} else {
    showLogin();
}

// Navigation
document.getElementById('show-register').onclick = (e) => {
    e.preventDefault();
    loginBox.classList.add('hidden');
    registerBox.classList.remove('hidden');
    authError.innerText = '';
};

document.getElementById('show-login').onclick = (e) => {
    e.preventDefault();
    registerBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
    authError.innerText = '';
};

document.getElementById('logout-btn').onclick = () => {
    token = null;
    localStorage.removeItem('token');
    showLogin();
};

function showLogin() {
    authSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
    loginBox.classList.remove('hidden');
    registerBox.classList.add('hidden');
}

function showDashboard() {
    authSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    fetchTasks();
}

// Auth Actions
document.getElementById('login-form').onsubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: loginUsername.value,
            password: loginPass.value
        })
    });
    const data = await res.json();
    if (res.ok) {
        token = data.token;
        localStorage.setItem('token', token);
        showDashboard();
        loginUsername.value = '';
        loginPass.value = '';
    } else {
        authError.innerText = data.error || 'Login failed';
    }
};

document.getElementById('register-form').onsubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: regUsername.value,
            password: regPass.value
        })
    });
    const data = await res.json();
    if (res.ok) {
        alert('Registration successful! Please login.');
        document.getElementById('show-login').click();
        regUsername.value = '';
        regPass.value = '';
    } else {
        authError.innerText = data.error || 'Registration failed';
    }
};

// Task Actions
async function fetchTasks() {
    const res = await fetch(`${API_URL}/tasks`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.status === 401) {
        document.getElementById('logout-btn').click();
        return;
    }
    const tasks = await res.json();
    renderTasks(tasks);
}

function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task-item';
        div.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description || ''}</p>
                <small>Status: ${task.status}</small>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(div);
    });
}
window.deleteTask = async (id) => {
    if(!confirm('Are you sure?')) return;
    await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchTasks();
};

document.getElementById('add-task-btn').onclick = async () => {
    if (!taskTitle.value) return;
    const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
            title: taskTitle.value,
            description: taskDesc.value
        })
    });
    if (res.ok) {
        taskTitle.value = '';
        taskDesc.value = '';
        fetchTasks();
    }
};
