import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
	name: Yup.string().min(2).required("This field is required"),
	email: Yup.string()
		.email("Must be valid email")
		.max(150)
		.required("This field is required"),
	password: Yup.string().min(8).required("This field is required"),
});
