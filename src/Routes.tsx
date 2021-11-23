import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

export const Routes: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' element={<Home />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Switch>
		</BrowserRouter>
	);
};
