
import { Route, Routes, Navigate } from 'react-router-dom'
//import type { Schema } from "../amplify/data/resource";
//import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import PatientDashboard from "./components/PatientDashboard";
import Settings from "./components/Settings";
import NavBar from './components/NavBar';

//const client = generateClient<Schema>();

function App() {
	// const { user  } = useAuthenticator();
	
	// if (!user) {
	// 	return null
	// }
	return (
		<div className="flex flex-col min-h-screen">
			<div className='flex-grow'>
				<Routes>
					<Route path="/" element={<Navigate to="/dashboard" replace />} />
					<Route path="/dashboard" element ={<PatientDashboard/>}/>
					<Route path="/settings" element ={<Settings/>}/>
				</Routes>
			</div>
			<NavBar/>
		</div>
	);
}

export default App;
