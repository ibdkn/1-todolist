import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

function App() {
    const [tasks, setTasks] = useState([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: false },
        { id: v1(), title: 'Typescript', isDone: false },
        { id: v1(), title: 'RTK query', isDone: false }
    ]);

    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false};
        const newState: TaskType[] = [newTask, ...tasks];
        setTasks(newState);
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
        const newState = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)
        setTasks([...newState]);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}

export default App;
