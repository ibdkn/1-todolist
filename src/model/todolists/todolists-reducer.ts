import {FilterValuesType, TodolistType} from "../../App";
import {v1} from "uuid";

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

type ActionType =
    | RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType

const initialState: TodolistType[] = [];
export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            const todolistId = action.payload.todolistId;

            return state.filter(tl => tl.id !== todolistId);
        }
        case 'ADD-TODOLIST': {
            const todolistId = action.payload.todolistId;
            const title = action.payload.title;
            const newTodolist: TodolistType = {id: todolistId, title, filter: 'all'}

            return [newTodolist, ...state];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolistId = action.payload.todolistId;
            const title = action.payload.title;

            return state.map(tl => tl.id === todolistId ? {...tl, title} : tl);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolistId = action.payload.todolistId;
            const filter = action.payload.filter;

            return state.map(tl => tl.id === todolistId ? {...tl, filter} : tl)
        }
        default: {
            return state;
        }
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistId: v1(),
            title
        }
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId, title
        }
    } as const
}

export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            filter,
            todolistId
        }
    } as const
}