import React, { useState, useEffect } from "react";
import "./style.css";

const crearUsuario = async () => {
    await fetch("https://playground.4geeks.com/todo/users/braian123", {
        method: "POST"
    });
};


const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
   
   const addTask = async () => {
    if (!newTask.trim()) return;

    await fetch("https://playground.4geeks.com/todo/todos/braian123", {
        method: "POST",
        body: JSON.stringify({
            label: newTask,
            done: false
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    setNewTask("");
    obtenerDatos(); // actualizar lista de tareas
    
};
    const deleteTask = async (id) => {
        await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE"
        });
        obtenerDatos(); // actualizar lista de tareas
    };
    const obtenerDatos = async () => {
        const res = await fetch("https://playground.4geeks.com/todo/users/braian123");
        const data = await res.json();
        setTasks(data.todos);
    };

    useEffect(() => {
        crearUsuario();
        obtenerDatos();

    }, []);

    return (
        <>
            <div>
                <h1 className="display-1 fw-lighter" style={{ color: "rgba(211, 179, 179, 0.61)" }}>todos</h1>
            </div>
            <div className="container w-50 shadow mb-4" style={{ background: "#ffffff" }}>
                <div className="input-group p-3 border-bottom">
                    <input
                        className="h4 fw-light "
                        id="newTask"
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") addTask();
                        }}
                        placeholder="What needs to be done?"
                    />
                </div>
                <div>
                    {tasks.length === 0
                        ? <p className="text-muted px-3 py-2">No tasks, add a task</p>
                        : <ul className="list-unstyled mb-0">
                            {tasks.map((task, index) => (
                                <li className="border-bottom d-flex justify-content-between px-3 py-3" key={index}>
                                    <span className="h5 fw-light mb-0"> {task.label} </span>
                                    <button className="delete-btn" onClick={() => deleteTask(task.id)}><i className="fa-solid fa-x text-danger"></i></button>
                                </li>
                            ))}
                        </ul>
                    }
                </div>
                <div className="d-flex justify-content-start px-3 py-2 text-muted fw-light small">
                    <p className="mb-0"> {tasks.length === 1 ? `${tasks.length} item left` : `${tasks.length} items left`}</p>
                </div>
            </div>
        </>
    );
};

export default Tasks;
