import React, { useEffect } from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Flex, Container, Heading, Link, Button } from "@chakra-ui/react";
import { Link as Route, useNavigate } from "react-router-dom";
import { notify } from "./../utils/notify";

interface Props {}

export const SecretPage: React.FC<Props> = () => {
	const [logout, { client }] = useLogoutMutation();
	const navigate = useNavigate();
	const { data, loading, error } = useMeQuery({
		fetchPolicy: "network-only",
	});
	useEffect(() => {
		if (!loading && !data.me) {
			navigate("/", { replace: true });
			notify("You need to login", "info");
		}
	}, []);
	if (loading) {
		return <div className=''>loading...</div>;
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
					Welcome to the Secret Page
				</Heading>
				<Button
					onClick={async () => {
						await client.resetStore();
						logout();
						navigate("/", { replace: true });
					}}
					color='teal'
					mt='1rem'>
					Return to Home Page/Logout
				</Button>
			</Flex>
		</Container>
	);
};
