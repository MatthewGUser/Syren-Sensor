import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
// import outputs from "../amplify_outputs.json";
import awsExports from "./aws-exports.ts";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Authenticator>
			{({ signOut, user }) => (
				<App user={user} signOut={signOut} />
			)}
		</Authenticator>
	</React.StrictMode>
);