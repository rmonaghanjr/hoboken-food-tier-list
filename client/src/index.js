import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {ToastProvider} from "react-toast-notifications";

ReactDOM.render(
	<ToastProvider autoDismiss autoDismissTimeout={6000}>
		<React.StrictMode>
			<App />
		</React.StrictMode>		
	</ToastProvider>,
	document.getElementById("root")
);
