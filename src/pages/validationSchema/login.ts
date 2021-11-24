import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Must be valid email")
		.max(150)
		.required("This field is required"),
	password: Yup.string().required("This field is required"),
});
