import { useEffect, useState } from 'react';
import styles from './todoList.module.css';

const TODOS_MOCK = [
	{
		"id": "001",
		"title": "Приготовить завтрак и не опоздать на работу",
		"completed": false
	},
	{
		"id": "002",
		"title": "Проработать 8 часов и не умереть",
		"completed": false
	},
	{
		"id": "003",
		"title": "Сходить в магазин за продуктами",
		"completed": false
	},
	{
		"id": "004",
		"title": "Прочитать 20 страниц книги перед сном",
		"completed": false
	},
	{
		"id": "005",
		"title": "Лечь спать вовремя и наконец-то выспаться",
		"completed": false
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
					: todos.map(({ id, title }) => (
					<li key={id} className={styles.listItem}>
						{title}
					</li>
				))}
			</ul>
		</div>
	);
};
