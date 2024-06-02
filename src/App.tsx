import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import React, {useState} from "react";
import {AddItemForm} from "./components/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import {MenuButton} from "./components/MenuButton";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from "@mui/material/CssBaseline";
import {
	addTodolistAC, changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
} from "./model/todolists/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./model/tasks/tasks-reducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./hooks/hooks";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'

function App() {
	const todolists = useAppSelector(state => state.todolists);
	const tasks = useAppSelector(state => state.tasks);
	const dispatch = useDispatch();

	const [themeMode, setThemeMode] = useState<ThemeMode>('light')

	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#087EA4',
			},
		},
	});

	const removeTask = (taskId: string, todolistId: string) => {
		const action = removeTaskAC(taskId, todolistId);

		dispatch(action);
	}

	const addTask = (title: string, todolistId: string) => {
		const action = addTaskAC(title, todolistId);

		dispatch(action);
	}

	const updateTask = (todolistId: string, taskId: string, title: string) => {
		const action = changeTaskTitleAC(todolistId, taskId, title);

		dispatch(action);
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		const action = changeTaskStatusAC(taskId, taskStatus, todolistId);

		dispatch(action);
	}

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		const action = changeTodolistFilterAC(filter, todolistId);

		dispatch(action);
	}

	const removeTodolist = (todolistId: string) => {
		const action = removeTodolistAC(todolistId);

		dispatch(action);
	}

	const addTodolist = (title: string) => {
		const action = addTodolistAC(title);

		dispatch(action);
	}

	const updateTodolist = (todolistId: string, title: string) => {
		const action = changeTodolistTitleAC(todolistId, title);

		dispatch(action);
	}

	const changeModeHandler = () => {
		setThemeMode(themeMode == "light" ? "dark" : 'light')
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<AppBar position="static" sx={{mb: '30px'}}>
				<Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
					<IconButton color="inherit">
						<MenuIcon/>
					</IconButton>
					<div>
						<MenuButton>Login</MenuButton>
						<MenuButton>Logout</MenuButton>
						<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
						<Switch color={'default'} onChange={changeModeHandler}/>
					</div>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container sx={{mb: '30px'}}>
					<AddItemForm addItem={addTodolist}/>
				</Grid>

				<Grid container spacing={4}>
					{todolists.map((tl) => {

						const allTodolistTasks = tasks[tl.id]
						let tasksForTodolist = allTodolistTasks

						if (tl.filter === 'active') {
							tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
						}

						if (tl.filter === 'completed') {
							tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
						}

						return (
							<Grid>
								<Paper sx={{p: '0 20px 20px 20px'}}>
									<Todolist
										key={tl.id}
										todolistId={tl.id}
										title={tl.title}
										tasks={tasksForTodolist}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeTaskStatus={changeTaskStatus}
										filter={tl.filter}
										removeTodolist={removeTodolist}
										updateTask={updateTask}
										updateTodolist={updateTodolist}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</ThemeProvider>
	);
}

export default App;
