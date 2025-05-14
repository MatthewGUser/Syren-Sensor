
import { Route, Routes, Navigate } from 'react-router-dom'
//import type { Schema } from "../amplify/data/resource";
//import { generateClient } from "aws-amplify/data";
// import { useAuthenticator } from "@aws-amplify/ui-react";
import PatientDashboard from "./components/PatientDashboard";
import Settings from "./components/Settings";
import NavBar from './components/NavBar';
import { SettingsProvider, useSettingsContext } from './context/SettingsContext';
//const client = generateClient<Schema>();

function EMSModal() {
	const { settingsState, handleCallEMS, handleCancelEMS } = useSettingsContext();

	if (!settingsState.emsModalOpen) return null;

	return (
		<div 
		role='dialog'
		aria-modal='true'
		aria-labelledby='ems-model-title'
		aria-describedby='ems-modal-description'
		className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
		<div className="bg-white p-6 rounded-lg max-w-sm w-full">
			<h2 id='ems-modal-title' className="text-lg font-semibold mb-2">Emergency Activation</h2>
			<p id=';ems-modal-description' className='mb-4'>Critical vitals detected. Do you want to call an EMS dispatcher?</p>
			<div className="mt-4 flex justify-between">
			<button
				aria-label='Cancel automatic EMS call'
				onClick={handleCancelEMS}
				className="text-black bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
			>
				Cancel
			</button>
			<button
				aria-label='Confirm EMS call now'
				onClick={handleCallEMS}
				className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md"
			>
				Call EMS
			</button>
			</div>
			<p className="text-xs text-gray-600 mt-4 text-center" aria-live='assertive'>
			Automatically calling in 60 seconds if no action is taken.
			</p>
		</div>
		</div>
	);
}

function App() {
	// const { user  } = useAuthenticator();
	
	// if (!user) {
	// 	return null
	// }
	
	return (
		<SettingsProvider>
			<div className="flex flex-col min-h-screen">
				<div className='flex-grow'>
					<Routes>
						<Route path="/" element={<Navigate to="/dashboard" replace />} />
						<Route path="/dashboard" element ={<PatientDashboard/>}/>
						<Route path="/settings" element ={<Settings/>}/>
					</Routes>
				</div>
				<NavBar/>
				<EMSModal/>
			</div>
		</SettingsProvider>
	);
}

export default App;
