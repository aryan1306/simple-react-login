import { Container, Heading, Text, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
	const history = useNavigate();

	return (
		<Container maxW='container.lg'>
			<Heading mt='3rem' mb='2rem' fontSize='2.2rem' textAlign='center'>
				Welcome to My App
			</Heading>
			<Text textAlign='center'>Login/Sign Up to proceed</Text>
			<Flex
				direction='column'
				alignItems='center'
				justifyContent='center'
				my='3.5em'>
				<Button
					onClick={() => history("/register")}
					mb='0.5em'
					colorScheme='teal'
					size='lg'
					w='43%'>
					Sign Up
				</Button>
				<Button onClick={() => history("/login")} size='lg' w='43%'>
					Login
				</Button>
			</Flex>
		</Container>
	);
};

export default Home;
