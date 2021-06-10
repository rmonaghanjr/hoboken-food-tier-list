import "./App.css";
import React from "react";
import "./components/TierComponent"
import TierComponent from "./components/TierComponent";
import {ToastProvider} from "react-toast-notifications";

const App = () => {
	return (
		<ToastProvider autoDismiss autoDismissTimeout={6000}>
			<div className="App">
				<button onClick={() => {

				}} className="button"><span style={{fontSize: 20}}>+</span> Add Resturant</button>
				<div className="title-bar">
					<h2 className="title">hoboken food tier list</h2>
					<p className="subtitle">A food tier list for the resturants around hoboken maintained by the opinions of the studens of The Stevens Institute of Technology.</p>
				</div>
				<TierComponent text={"S Tier"} color={"#FE7E7E"} items={[{name: "Dunkin' Donuts", website: "Dunkin' Donuts"}]}/>
				<TierComponent text={"A Tier"} color={"#FFBE7E"} />
				<TierComponent text={"B Tier"} color={"#FFFF7F"} />
				<TierComponent text={"C Tier"} color={"#BEFE7E"} />
				<TierComponent text={"D Tier"} color={"#7FFFFF"} />
				<TierComponent text={"F Tier"} color={"#7EBEFE"} />
			</div>
		</ToastProvider>
	);
}

export default App;
