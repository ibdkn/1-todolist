import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from "./Button";
import {TodolistType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string,
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (todolistID: string, taskId: string) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, newIsDone: boolean) => void
    todolists: TodolistType[]
    setTodolists: (newTodolists: TodolistType[]) => void
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export const Todolist = ({ todolistID, title, tasks, filter, removeTask, addTask, changeTaskStatus, todolists, setTodolists }: PropsType) => {
    let tasksForTodolists = tasks;

    if(filter === "active") {
        tasksForTodolists = tasks.filter(task => !task.isDone);
    }

    if(filter === "completed") {
        tasksForTodolists = tasks.filter(task => task.isDone);
    }

    const changeFilter = (filter: FilterValuesType) => {
       setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter} : tl));
    }

    const [taskTitle, setTaskTitle] = useState("");

    const [taskErrorInput, setTaskErrorInput] = useState<string | null>(null);

    const MAX_LENGTH_TITLE = 20;

    const titleIsLong = taskTitle.length > MAX_LENGTH_TITLE;

    const onChangeSetTaskTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    }

    const onClickAddTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim();
        if(trimmedTaskTitle) {
            addTask(todolistID,trimmedTaskTitle);
        } else {
            setTaskErrorInput("Title is required!")
        }
        setTaskTitle("");
    }

    const onKeyDownAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setTaskErrorInput("");
        if(event.key === 'Enter' && !titleIsLong) {
            onClickAddTaskHandler();
        }
    }

    return (
        <div className="Todolist">
            <h3>{title}</h3>
            <div className="Controls">
                <input value={taskTitle} className={taskErrorInput ? 'error' : ''}
                       onChange={onChangeSetTaskTitle} onKeyDown={onKeyDownAddTaskHandler}/>
                <Button title={"+"} onClick={onClickAddTaskHandler} disabled={!taskTitle || titleIsLong}/>
                {titleIsLong ? <p className="input-error">The task title can't be longer than {MAX_LENGTH_TITLE} letters</p>  : ""}
                {taskErrorInput && <p className="input-error">{taskErrorInput}</p>}
            </div>
            {tasksForTodolists.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <ul>
                    {tasksForTodolists.map(task => {
                        const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(todolistID, task.id, event.currentTarget.checked);
                        }

                        return (
                            <li key={task.id}>
                                <label className={task.isDone ? 'done' : ''}>
                                    <input type="checkbox" checked={task.isDone} onChange={onChangeTaskStatusHandler}/>
                                    <span>{task.title}</span>
                                </label>
                                <Button title={'x'} onClick={() => removeTask(todolistID, task.id)}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div className="Filters">
                <Button className={filter === 'all' ? 'active' : ''} title={"All"} onClick={() => changeFilter("all")}/>
                <Button className={filter === 'active' ? 'active' : ''} title={"Active"} onClick={() => changeFilter("active")}/>
                <Button className={filter === 'completed' ? 'active' : ''} title={"Completed"} onClick={() => changeFilter("completed")}/>
            </div>
        </div>
    );
};
