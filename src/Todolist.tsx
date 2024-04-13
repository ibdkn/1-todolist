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
}

type FilterValuesType = 'all' | 'active' | 'completed'

export const Todolist = ({ title, tasks, removeTask, addTask }: PropsType) => {

    const [filter, setFilter] = useState<FilterValuesType>("all");

    const [taskTitle, setTaskTitle] = useState("");
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
        addTask(taskTitle);
        setTaskTitle("");
    }

    const onKeyDownAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            onClickAddTaskHandler();
        }
    }

    return (
        <div className="Todolist">
            <h3>{title}</h3>
            <div className="Controls">
                <input value={taskTitle} onChange={onChangeSetTaskTitle} onKeyDown={onKeyDownAddTaskHandler}
                />
                <Button title={"+"} onClick={onClickAddTaskHandler} disabled={!taskTitle || titleIsLong}/>
                {titleIsLong ? <p className="input-error">The task title can't be longer than {MAX_LENGTH_TITLE} letters</p>  : ""}
            </div>
            {filteredTasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <ul>
                    {filteredTasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} />
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={()=> removeTask(task.id)} />
                            </li>
                        )
                    })}
                </ul>
            )}
            <div className="Filters">
                <Button title={"All"} onClick={()=>setFilter("all")}/>
                <Button title={"Active"} onClick={()=>setFilter("active")}/>
                <Button title={"Completed"} onClick={()=>setFilter("completed")}/>
            </div>
        </div>
    );
};
