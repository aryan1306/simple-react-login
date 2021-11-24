export const setToken = (token: string) => {
	localStorage.setItem("jid", token);
};

export const getToken = () => {
	return localStorage.getItem("jid");
};
