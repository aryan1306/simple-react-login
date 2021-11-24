import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import {
	Flex,
	Container,
	Heading,
	Link,
	Button,
	Box,
	Image,
	Grid,
} from "@chakra-ui/react";
import { Link as Route, useNavigate } from "react-router-dom";

interface Props {}

export const SecretPage: React.FC<Props> = () => {
	const [logout, { client }] = useLogoutMutation();
	const history = useNavigate();
	const { data, loading, error } = useMeQuery({
		fetchPolicy: "network-only",
	});
	if (loading) {
		return <div>loading...</div>;
	}

	if (error) {
		return (
			<Container w='100%'>
				<Flex
					direction='column'
					mt='3rem'
					alignItems='center'
					justifyContent='center'>
					<Heading fontSize='lg'>
						There was some error loading the Page.
					</Heading>
					<Link mt='1rem' as={Route} to='/'>
						Return to Home Page
					</Link>
				</Flex>
			</Container>
		);
	}

	if (!data) {
		return (
			<Container w='100%'>
				<Flex
					direction='column'
					mt='3rem'
					alignItems='center'
					justifyContent='center'>
					<Heading fontSize='lg'>
						There was some error loading the Page.
					</Heading>
					<Link mt='1rem' as={Route} to='/'>
						Return to Home Page
					</Link>
				</Flex>
			</Container>
		);
	}

	return (
		<Container w='100%'>
			<Flex
				direction='column'
				mt='3rem'
				alignItems='center'
				justifyContent='center'>
				<Heading textAlign='center' fontSize='3rem'>
					Welcome {data.me.name}!
				</Heading>
				<Button
					onClick={async () => {
						await logout();
						await client.resetStore();
						history("/");
					}}
					color='teal'
					mt='1rem'>
					Return to Home Page
				</Button>
			</Flex>
		</Container>
	);
};
