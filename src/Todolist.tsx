import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from "./Button";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}

type FilterValuesType = 'all' | 'active' | 'completed'

export const Todolist = ({ title, tasks, removeTask, addTask, changeTaskStatus }: PropsType) => {

    const [filter, setFilter] = useState<FilterValuesType>("all");

    const [taskTitle, setTaskTitle] = useState("");

    const [taskErrorInput, setTaskErrorInput] = useState<string | null>(null);

    const filterTasks = (allTasks: TaskType[], nextFilterValue: FilterValuesType) => {
        switch (nextFilterValue) {
            case "active":
                return allTasks.filter(task => task.isDone === false);
            case "completed":
                return allTasks.filter(task => task.isDone === true);
            default:
                return allTasks;
        }
    }

    const filteredTasks = filterTasks(tasks, filter);

    const MAX_LENGTH_TITLE = 20;

    const titleIsLong = taskTitle.length > MAX_LENGTH_TITLE;

    const onChangeSetTaskTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    }

    const onClickAddTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim();
        if(trimmedTaskTitle) {
            addTask(trimmedTaskTitle);
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
            {filteredTasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <ul>
                    {filteredTasks.map(task => {
                        const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(task.id, event.currentTarget.checked);
                        }

                        return (
                            <li key={task.id}>
                                <label>
                                    <input type="checkbox" checked={task.isDone} onChange={onChangeTaskStatusHandler}/>
                                    <span>{task.title}</span>
                                </label>
                                <Button title={'x'} onClick={() => removeTask(task.id)}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div className="Filters">
                <Button className={filter === 'all' ? 'active' : ''} title={"All"} onClick={()=>setFilter("all")}/>
                <Button className={filter === 'active' ? 'active' : ''} title={"Active"} onClick={()=>setFilter("active")}/>
                <Button className={filter === 'completed' ? 'active' : ''} title={"Completed"} onClick={()=>setFilter("completed")}/>
            </div>
        </div>
    );
};
