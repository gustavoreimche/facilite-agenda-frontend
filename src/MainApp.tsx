import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/Login/SignUp";
import SignIn from "./pages/Login/SignIn";
import App from "./pages/App/App";
import { RequireAuth } from "./RequireAuth";

const MainApp = () => {
	return (
		<Routes>
			<Route path="/" element={<SignIn />} />
			<Route path="/signup" element={<SignUp />} />
			<Route
				path="/app"
				element={
					<RequireAuth>
						<App />
					</RequireAuth>
				}
			/>
		</Routes>
	);
};

export default MainApp;
