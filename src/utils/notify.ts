import { toast } from "react-toastify";

export const notify = (text: string | undefined) => {
	return toast.error(text, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};
