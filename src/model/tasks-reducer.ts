import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType} from "./todolist-reducer";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        taskId: string
        todolistId: string
    }
}

type AddTaskType = {
    type: 'ADD-TASK'
    payload: {
        title: string,
        todolistId: string
    }
}

type UpdateTaskType = {
    type: 'UPDATE-TASK'
    payload: {
        todolistId: string,
        taskId: string,
        title: string
    }
}

type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        taskId: string,
        taskStatus: boolean,
        todolistId: string
    }
}

type InitializeTasksType = {
    type: 'INITIALIZE-TASKS',
    payload: {
        todolistId: string
    }
}

type ActionType = RemoveTaskActionType | AddTaskType | UpdateTaskType | ChangeTaskStatusType | AddTodolistActionType | InitializeTasksType

const initialTasksState: TasksStateType = {};


export const tasksReducer = (state: TasksStateType = initialTasksState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'INITIALIZE-TASKS': {
            const todolistId = action.payload.todolistId;
            return {
                ...state,
                [todolistId]: []
            };
        }
        case 'REMOVE-TASK': {
            const {taskId, todolistId} = action.payload;
            const newTasksForTodolist = state[todolistId].filter(task => task.id !== taskId);

            return {
                ...state,
                [todolistId]: newTasksForTodolist
            }
        }
        case 'ADD-TASK': {
            const {todolistId, title} = action.payload;
            const newTask = {
                id: v1(),
                title: title,
                isDone: false
            }
            return {
                ...state,
                [todolistId]: [newTask, ...state[todolistId]]
            }
        }
        case 'UPDATE-TASK': {
            const {todolistId, taskId, title} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, title} : t)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            const {todolistId, taskId, taskStatus} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
            }
        }
        default:
            return state
    }

}

export const addTaskAC = (title: string, todolistId: string): AddTaskType => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}

export const initializeTaskAC = (todolistId: string): InitializeTasksType => {
    return {
        type: 'INITIALIZE-TASKS',
        payload: {
            todolistId
        }
    } as const
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todolistId
        }
    } as const
}

export const updateTaskAC = (todolistId: string, taskId: string, title: string): UpdateTaskType => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistId,
            taskId,
            title
        }
    } as const
}

export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, todolistId: string): ChangeTaskStatusType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId,
            taskStatus,
            todolistId
        }
    }
}
