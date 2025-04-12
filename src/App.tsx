import type { Schema } from "../amplify/data/resource";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();
const App = () => {
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await client.User.query.all();
				setData(result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className='App'>
			<h1>Data from Amplify</h1>
			{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
		</div>
	);
};

export default App;
