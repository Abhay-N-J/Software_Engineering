import {React, BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Auth from "./Authentication/Auth";
import { useEffect, useState } from "react";
import { getToken } from "./Misc/Tokens";
import { CreateSurvey } from "./Components/CreateSurvey";
import "./App.css";
import { View } from "./Components/View";

function App() {

	const [auth, setAuth] = useState(false);

	useEffect(() => {
		setAuth(getToken() !== null)
	}, [])


		return (
			<Router>
				<Routes>
					{auth ? (
					<>
						<Route path="/" element={<CreateSurvey />} />
						<Route path="/view" element={<View />} />
						<Route path="/login" element={<Auth login={true} />} />
						<Route path="/signup" element={<Auth login={false} />} />
					</>
					) : (
					<>
						<Route path="*" element={<Auth login={true} />} />
						<Route path="/view" element={<View/>} />
					</>
					)}
				</Routes>
   			</Router>
		);
}


export default App;
