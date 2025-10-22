import { useEffect, useState } from 'react';
import styles from './todoList.module.css';

const TODOS_MOCK = [
	{
		"id": "001",
		"task": "Приготовить завтрак и не опоздать на работу",
	},
	{
		"id": "002",
		"task": "Проработать 8 часов и не умереть",
	},
	{
		"id": "003",
		"task": "Сходить в магазин за продуктами",
	},
	{
		"id": "004",
		"task": "Прочитать 20 страниц книги перед сном",
	},
	{
		"id": "005",
		"task": "Лечь спать вовремя и наконец-то выспаться",
	},
];

export const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		new Promise ((resolve) => {
			setTimeout(() => {
				resolve({ json: () => TODOS_MOCK });
			},2000)

		})
			.then ((loadedData) => loadedData.json())
			.then((loadedList) => {
				setTodos(loadedList);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.listContainer}>
			<h3 className={styles.listHeading}>Список дел</h3>
			<ul className={styles.list}>
				{isLoading
					? <div className={styles.loader}></div>
					: todos.map(({ id, task }) => (
					<li key={id} className={styles.listItem}>
						{task}
					</li>
				))}
			</ul>
		</div>
	);
};
