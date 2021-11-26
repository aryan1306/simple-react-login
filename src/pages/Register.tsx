import {
	Heading,
	Input,
	Grid,
	Container,
	Button,
	Flex,
	Link,
	Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import Card from "../components/Card";
import { registerSchema } from "./validationSchema/register";
import { useRegisterMutation } from "./../generated/graphql";
import { useNavigate, Link as Route } from "react-router-dom";
import { notify } from "./../utils/notify";

export const Register: React.FC = () => {
	const [register] = useRegisterMutation();
	const history = useNavigate();
	return (
		<Container w='100%' my='3rem'>
			<Grid placeItems='center'>
				<Card>
					<Heading textAlign='center' mb='6'>
						Register
					</Heading>
					<Formik
						initialValues={{
							name: "",
							email: "",
							password: "",
						}}
						validationSchema={registerSchema}
						onSubmit={async ({ name, email, password }) => {
							try {
								const res = await register({
									variables: { name, email, password },
								});
								if (res && res.data) {
									history("/secret-page", { replace: true });
								}
							} catch (error: any) {
								notify(error?.message);
							}
						}}>
						{({
							values,
							errors,
							handleSubmit,
							handleChange,
							handleBlur,
							touched,
						}) => (
							<Form>
								<Input
									name='name'
									isInvalid={!!errors.name && touched.name}
									mb='4'
									onBlur={handleBlur}
									placeholder='Full Name'
									value={values.name}
									onChange={handleChange}
								/>
								{errors.name && touched.name ? (
									<Text my={2} color='red' fontSize='sm'>
										{errors.name}
									</Text>
								) : null}
								<Input
									name='email'
									isInvalid={!!errors.email && touched.email}
									onBlur={handleBlur}
									mb='4'
									placeholder='E-mail'
									value={values.email}
									onChange={handleChange}
								/>
								{errors.email && touched.email ? (
									<Text my={2} color='red' fontSize='sm'>
										{errors.email}
									</Text>
								) : null}
								<Input
									value={values.password}
									isInvalid={!!errors.password && touched.password}
									onChange={handleChange}
									onBlur={handleBlur}
									name='password'
									mb='4'
									type='password'
									placeholder='Password'
								/>
								{errors.password && touched.password ? (
									<Text my={2} color='red' fontSize='sm'>
										{errors.password}
									</Text>
								) : null}

								<Button
									onSubmit={() => handleSubmit}
									type='submit'
									mt='6'
									colorScheme='teal'>
									Sign Up
								</Button>
							</Form>
						)}
					</Formik>
					<Flex alignItems='center' justifyContent='flex-end'>
						<Link as={Route} color='teal' to='/login'>
							Already have an account?
						</Link>
					</Flex>
				</Card>
			</Grid>
		</Container>
	);
};
