import React, {useState} from 'react';
import './App.css';
import {FilterValuesType, TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},

    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: 'Laptop', isDone: true},
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Desk', isDone: false},
            {id: v1(), title: 'Lamp', isDone: false},
        ],
    })
    const removeTask = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(tl => tl.id !== taskId)});
    }

    const addTask = (todolistID: string, title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    const changeTaskStatus = (todolistID: string, taskId: string, newIsDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map((t => t.id === taskId ? {...t, isDone: newIsDone} : t))})
        // const newState = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)
        // setTasks([...newState]);
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                return (
                    <Todolist
                        key={tl.id}
                        todolistID={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        todolists={todolists}
                        setTodolists={setTodolists}
                    />
                )
            })}
        </div>
    );
}

export default App;
