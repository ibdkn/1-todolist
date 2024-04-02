import React, {useState} from 'react';
import {Button} from "./Button";

type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: TaskType[]
    removeTask: (taskId: number) => void
}

type FilterValuesType = 'all' | 'active' | 'completed'

export const Todolist = ({ title, tasks, removeTask }: PropsType) => {

    const [filter, setFilter] = useState<FilterValuesType>("all");
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

    return (
        <div className="Todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={"+"}/>
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
            <div>
                <Button title={"All"} onClick={()=>setFilter("all")}/>
                <Button title={"Active"} onClick={()=>setFilter("active")}/>
                <Button title={"Completed"} onClick={()=>setFilter("completed")}/>
            </div>
        </div>
    );
};
