import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeIsDone: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, changeIsDone, filter}: PropsType) => {
    const [taskTitle, setTaskTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        taskTitle.trim() ? addTask(taskTitle.trim()) : setError('Title is required')
        setTaskTitle('')
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }

    const onChangeHandler = (id: string, checked: boolean) => {
        changeIsDone(id, checked)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />

                <Button title={'+'} onClick={addTaskHandler}/>
            </div>
            {error && <span className={'errorMessage'}>{error}</span>}
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(task.id)
                            }

                            // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            //     changeIsDone(task.id, e.currentTarget.checked)
                            // }

                            return <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                                <input onChange={(e) => onChangeHandler(task.id, e.currentTarget.checked)} type="checkbox"
                                       checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button onClick={removeTaskHandler} title={'x'}/>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button active={filter === 'all'} title={'All'} onClick={() => changeFilterTasksHandler('all')}/>
                <Button active={filter === 'active'} title={'Active'}
                        onClick={() => changeFilterTasksHandler('active')}/>
                <Button active={filter === 'completed'} title={'Completed'}
                        onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    )
}
