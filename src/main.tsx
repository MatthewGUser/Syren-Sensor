import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles.css";
// import { Authenticator } from "@aws-amplify/ui-react";
//import { Amplify } from "aws-amplify";
//import outputs from "../amplify_outputs.json";
// import "@aws-amplify/ui-react/styles.css";
import { BrowserRouter } from "react-router-dom";

//Amplify.configure(outputs);

// const formFields = {
// 	signUp: {
// 		// Basic Information
// 		name: {
// 			order: 1,
// 			label: "Full Name",
// 			placeholder: "Enter your full name",
// 			isRequired: true,
// 		},
// 		email: {
// 			order: 2,
// 			label: "Email",
// 			placeholder: "Enter your email",
// 			isRequired: true,
// 		},
// 		phone_number: {
// 			order: 3,
// 			label: "Phone Number",
// 			placeholder: "Enter your phone number",
// 			isRequired: true,
// 		},
// 		// Personal Details
// 		birthdate: {
// 			order: 4,
// 			label: "Date of Birth",
// 			placeholder: "YYYY-MM-DD",
// 			type: "date",
// 			isRequired: true,
// 		},
// 		gender: {
// 			order: 5,
// 			label: "Gender",
// 			placeholder: "Enter your gender identity",
// 			type: "text",
// 		},
// 		address: {
// 			order: 6,
// 			label: "Address",
// 			placeholder: "Enter your address",
// 			type: "textarea",
// 		},
// 		// Security
// 		password: {
// 			order: 7,
// 			label: "Password",
// 			placeholder: "Create a strong password",
// 			isRequired: true,
// 			type: "password",
// 		},
// 		confirm_password: {
// 			order: 8,
// 			label: "Confirm Password",
// 			placeholder: "Confirm your password",
// 			isRequired: true,
// 			type: "password",
// 		},
// 	},
// };

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			{/* <Authenticator formFields={formFields}> */}
				<App />
			{/* </Authenticator> */}
		</BrowserRouter>
	</React.StrictMode>
);
