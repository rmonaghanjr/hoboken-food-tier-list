import "./App.css";
import React, { useEffect, useState } from "react";
import "./components/TierComponent"
import TierComponent from "./components/TierComponent";
import {useToasts} from "react-toast-notifications";

const App = () => {

	const {addToast} = useToasts();

	let [sTier, setSTier] = useState([]);
	let [aTier, setATier] = useState([]);
	let [bTier, setBTier] = useState([]);
	let [cTier, setCTier] = useState([]);
	let [dTier, setDTier] = useState([]);
	let [fTier, setFTier] = useState([]);

	const reload = () => {
		let url = "http://stevensfoodguide.com:8000/api/ratings/all"

		fetch(url)
		.then(res => {
			if (res.status === 500) {
				addToast("An internal server error occurred. Please try again later.", {appearance: "error"})
			} else if (res.status === 200) {
				res.json().then(data => {
					data.items.forEach((item) => {
						console.log(item);
						let score = isNaN(item["score"] / item["possible"]) ? 0 : (item["score"] / item["possible"]) * 100;
						let cutoff = 100/6;

						let s = sTier;
						let a = aTier;
						let b = bTier;
						let c = cTier;
						let d = dTier;
						let f = fTier;
						if (score < cutoff) {
							f.push(item);
						} else if (score >= cutoff && score < 2*cutoff) {
							d.push(item);
						} else if (score >= 2*cutoff && score < 3*cutoff) {
							c.push(item);
						} else if (score >= 3*cutoff && score < 4*cutoff) {
							b.push(item);
						} else if (score >= 4*cutoff && score < 5*cutoff) {
							a.push(item);
						} else if (score >= 5*cutoff) {
							s.push(item);
						}

						setSTier(s);
						setATier(a);
						setBTier(b);
						setCTier(c);
						setDTier(d);
						setFTier(f);
					});
				})
			}
		})
	}

	useEffect(() => {
		reload()

		let url = "http://stevensfoodguide.com:8000/api/stats/increment/viewCount";
		fetch(url)
		.then(res => {console.log(res)})
	}, []);

	const addNewItem = () => {
		let name = prompt("Enter a name for the new item:");
		let website = prompt("Paste the website for the restaurants:");

		if (name === undefined || website === undefined || name === "" || website === "" || name === null || website === null) {
			alert("You cannot have blank fields. Try again.")
		} else {
			let url = "http://stevensfoodguide.com:8000/api/items/add?name="+name+"&website="+website;

			fetch(url)
			.then(res => {
				if (res.status === 200) {
					addToast("Item added successfully! You can now vote on the restaurants. It starts in the F tier before the first vote.", {appearance: "success"});
					reload();
				} else if (res.status === 500) {
					console.log(res)
					addToast("An internal server error occurred. Please try again later.", {appearance: "error"});
				}
			})
		}
	}

	return (
		<div className="App">
			<button onClick={addNewItem} className="button"><span style={{fontSize: 20}}>+</span> Add Restaurant</button>
			<div className="title-bar">
				<h2 className="title">stevens food guide</h2>
				<p className="subtitle">A food tier list for the restaurants around hoboken maintained by the opinions of the studens of The Stevens Institute of Technology.</p>
			</div>
			<TierComponent text={"S Tier"} color={"#FE7E7E"} items={sTier} onVote={reload} />
			<TierComponent text={"A Tier"} color={"#FFBE7E"} items={aTier} onVote={reload} />
			<TierComponent text={"B Tier"} color={"#FFFF7F"} items={bTier} onVote={reload} />
			<TierComponent text={"C Tier"} color={"#BEFE7E"} items={cTier} onVote={reload} />
			<TierComponent text={"D Tier"} color={"#7FFFFF"} items={dTier} onVote={reload} />
			<TierComponent text={"F Tier"} color={"#7EBEFE"} items={fTier} onVote={reload} />
		</div>
	);
}

export default App;
