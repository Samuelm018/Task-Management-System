"use client";
import { useState, useEffect } from 'react';

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
}

interface TaskManagerProps {
    token: string;
    onLogout: () => void;
}

export default function TaskManager({ token, onLogout }: TaskManagerProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await fetch('http://127.0.0.1:5000/tasks', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
            const data = await res.json();
            setTasks(data);
        } else if (res.status === 401) {
            onLogout();
        }
    };

    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return;

        const res = await fetch('http://127.0.0.1:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title, description: desc })
        });

        if (res.ok) {
            setTitle('');
            setDesc('');
            fetchTasks();
        }
    };

    const deleteTask = async (id: number) => {
        if (!confirm('Delete task?')) return;
        await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchTasks();
    };

    return (
        <div className="glass-container dashboard-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>My Tasks</h1>
                <button className="logout-btn" onClick={onLogout}>Logout</button>
            </div>

            <form onSubmit={addTask} style={{ marginBottom: '30px' }}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New Task Title"
                    required
                />
                <input
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Description"
                />
                <button type="submit">Add Task</button>
            </form>

            <div className="task-list">
                {tasks.map((task) => (
                    <div key={task.id} className="task-item">
                        <div>
                            <h3>{task.title}</h3>
                            <p style={{ fontSize: '0.85rem', color: '#555' }}>{task.description}</p>
                        </div>
                        <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                ))}
                {tasks.length === 0 && <p style={{ textAlign: 'center', color: '#666' }}>No tasks found. Add one!</p>}
            </div>
        </div>
    );
}
