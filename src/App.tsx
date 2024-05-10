import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
	let todolistID1 = v1()
	let todolistID2 = v1()


	let [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	])

	let [tasks, setTasks] = useState({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})

	const removeTask = (todolistID: string, taskId: string) => {
		setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskId)})
	}

	const addTask = (todolistID: string, title: string) => {
		const newTask = {id: v1(), title, isDone: false}
		setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
	}

	const changeFilter = (todolistID: string, filter: FilterValuesType) => {
		setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter} : tl))
	}

	const changeTaskStatus = (todolistID: string, taskId: string, taskStatus: boolean) => {
		setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)})
	}


	return (
		<div className="App">
			{todolists.map(tl => {
				const allTodolistTasks = tasks[tl.id];
				let tasksForTodolist = allTodolistTasks;

				if (tl.filter === 'active') {
					tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
				}

				if (tl.filter === 'completed') {
					tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
				}

				return (
					<Todolist
						todolistID={tl.id}
						title={tl.title}
						tasks={tasksForTodolist}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						filter={tl.filter}
					/>
				)
			})}
		</div>
	);
}

export default App;
