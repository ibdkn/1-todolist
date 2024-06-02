import {TasksStateType} from "../../App";
import {AddTodolistACType, RemoveTodolistACType} from "../todolists/todolists-reducer";
import {v1} from "uuid";

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type ActionType =
    | RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | RemoveTodolistACType
    | AddTodolistACType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            const todolistId = action.payload.todolistId;

            const stateCopy = {...state}
            delete stateCopy[todolistId];
            return stateCopy;
        }
        case 'ADD-TODOLIST': {
            const todolistId = action.payload.todolistId;
            const stateCopy = {...state}
            stateCopy[todolistId] = [];

            return stateCopy;
        }
        case 'REMOVE-TASK': {
            const todolistId = action.payload.todolistId;
            const taskId = action.payload.taskId;

            return {
                ...state,
                [todolistId]: state[todolistId].filter(t => t.id !== taskId)
            };
        }
        case 'ADD-TASK': {
            const title = action.payload.title
            const todolistId = action.payload.todolistId
            const newTask = {id: v1(), title, isDone: false}
            return {
                ...state,
                [todolistId]: [newTask, ...state[todolistId]]
            };
        }
        case 'CHANGE-TASK-STATUS': {
            const todolistId = action.payload.todolistId
            const taskId = action.payload.taskId
            const isDone = action.payload.taskStatus

            return {
                ...state,
                [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            const todolistId = action.payload.todolistId
            const taskId = action.payload.taskId
            const title = action.payload.title

            return {
                ...state,
                [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, title} : t)
            }
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId, todolistId
        }
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title, todolistId
        }
    } as const
}

export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId, taskId, taskStatus
        }
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId, taskId, title
        }
    } as const
}
