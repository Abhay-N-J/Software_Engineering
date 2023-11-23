import {React, BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Auth from "./Authentication/Auth";
import { useEffect, useState } from "react";
import { getToken } from "./Misc/Tokens";
import { CreateSurvey } from "./Components/CreateSurvey";
import "./App.css";
import { View } from "./Components/View";
import { EditSurvey } from "./Components/EditSurvey";
import { ListSurveys } from "./Components/ListSurveys";
import { ReportPage } from "./Components/Report";
import { Navbar } from "./Components/Navbar";

function App() {

	const [auth, setAuth] = useState(false);

	useEffect(() => {
		setAuth(getToken() !== null)
	}, [])


		return (
			<Router>
				<Navbar></Navbar>
				<div style={{padding:"20px"}}>
					<Routes>
						{auth ? (
						<>
							<Route path="/" element={<CreateSurvey />} />
							<Route path="/edit" element={<EditSurvey />} />
							<Route path="/view" element={<View />} />
							<Route path="/login" element={<Auth login={true} />} />
							<Route path="/signup" element={<Auth login={false} />} />
							<Route path="/list" element={<ListSurveys />} />
							<Route path="/report" element={<ReportPage />} />
						</>
						) : (
						<>
							<Route path="*" element={<Auth login={true} />} />
							<Route path="/view" element={<View/>} />
						</>
						)}
					</Routes>
				</div>
   			</Router>
		);
}


export default App;
