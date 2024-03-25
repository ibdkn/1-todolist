import React from 'react';

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: TaskType[]
}

export const Todolist = ({ title, tasks }: PropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(task => {
                    return (
                        <li>
                            <input type="checkbox" checked={task.isDone} />
                            <span>{task.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
