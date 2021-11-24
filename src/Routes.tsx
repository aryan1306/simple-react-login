import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { SecretPage } from "./pages/SecretPage";

export const Routes: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' element={<Home />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/secret-page' element={<SecretPage />} />
			</Switch>
		</BrowserRouter>
	);
};
