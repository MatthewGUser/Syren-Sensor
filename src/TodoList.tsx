import { useState, useEffect } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Nullable } from "@aws-amplify/data-schema";

const client = generateClient<Schema>({
	authMode: "userPool",
});

export default function TodoList() {
	const [todos, setTodos] = useState<
		{
			content: Nullable<string>;
			isDone: Nullable<boolean>;
			readonly id: string;
			readonly createdAt: string;
			readonly updatedAt: string;
		}[]
	>([]);

	const fetchTodos = async () => {
		const { data: items, errors } = await client.models.Todo.list();
		if (!errors) {
			setTodos(items);
		} else {
			console.error(errors);
		}
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	const createTodo = async () => {
		await client.models.Todo.create({
			content: window.prompt("Todo content?"),
			isDone: false,
		});

		fetchTodos();
	};

	return (
		<div>
			<button onClick={createTodo}>Add new todo</button>
			<ul>
				{todos.map(({ id, content }) => (
					<li key={id}>{content}</li>
				))}
			</ul>
		</div>
	);
}
