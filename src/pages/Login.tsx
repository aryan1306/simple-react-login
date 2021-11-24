import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Container, Grid, Heading, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import React from "react";
import Card from "../components/Card";
import { loginSchema } from "./validationSchema/login";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./../generated/graphql";
import { notify } from "./../utils/notify";
import { setToken } from "./../utils/token";

export const Login: React.FC = () => {
	const navigate = useNavigate();
	const [login] = useLoginMutation();
	return (
		<Container w='100%' my='3rem'>
			<Grid placeItems='center'>
				<Card>
					<Heading textAlign='center' mb='6'>
						Login
					</Heading>
					<Formik
						initialValues={{
							email: "",
							password: "",
						}}
						// enableReinitialize={true}
						validationSchema={loginSchema}
						onSubmit={async ({ email, password }) => {
							try {
								const res = await login({ variables: { email, password } });
								if (res && res.data) {
									// setToken(res.data?.login?.accessToken);
									setToken(res.data?.login?.accessToken);
									navigate("/secret-page");
								}
								console.log(res);
							} catch (error: any) {
								// console.log(error);
								notify(error?.message);
							}
						}}>
						{({
							values,
							isSubmitting,
							errors,
							handleBlur,
							handleChange,
							touched,
						}) => (
							<Form>
								<Input
									name='email'
									isInvalid={!!errors.email && touched.email}
									mb='4'
									onBlur={handleBlur}
									placeholder='E-mail'
									value={values.email}
									onChange={handleChange}
								/>
								{errors.email && touched.email ? (
									<Text mb='2' color='red' fontSize='sm'>
										{errors.email}
									</Text>
								) : null}
								<Input
									name='password'
									isInvalid={!!errors.password && touched.password}
									mb='4'
									onBlur={handleBlur}
									type='password'
									placeholder='Password'
									value={values.password}
									onChange={handleChange}
								/>
								{errors.password && touched.password ? (
									<Text mb='2' color='red' fontSize='sm'>
										{errors.password}
									</Text>
								) : null}
								<Button
									type='submit'
									disabled={isSubmitting}
									colorScheme='teal'>
									Login
								</Button>
							</Form>
						)}
					</Formik>
				</Card>
			</Grid>
		</Container>
	);
};
