import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Routes } from "./Routes";
import { getToken, setToken } from "./utils/token";

export const App: React.FC = () => {
	const token = getToken();
	const [loading, setLoading] = useState(true);
	// const p = jwtDecode(token!);
	useEffect(() => {
		//@ts-ignore
		if (!token) {
			fetch("http://localhost:4000/api/refresh-token", {
				method: "POST",
				credentials: "include",
			}).then(async (res) => {
				const { accessToken } = await res.json();
				// console.log(accessToken);
				setToken(accessToken);
				setLoading(false);
			});
		}
		if (token) {
			setLoading(false);
		}
	}, []);
	if (loading) {
		return <div className=''>loading...</div>;
	}
	return <Routes />;
};
