import { Heading, Input, Grid, Container, Button } from "@chakra-ui/react";
import React from "react";
import Card from "../components/Card";

export const Register: React.FC = () => {
	return (
		<Container w='100%' my='3rem'>
			<Grid placeItems='center'>
				<Card>
					<Heading textAlign='center' mb='6'>
						Register
					</Heading>
					<Input mb='4' placeholder='Full Name' />
					<Input mb='4' placeholder='E-mail' />
					<Input mb='4' type='password' placeholder='Password' />
					<Input type='password' placeholder='Confirm Password' />
					<Button mt='6' colorScheme='teal'>
						Sign Up
					</Button>
				</Card>
			</Grid>
		</Container>
	);
};
