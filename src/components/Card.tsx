import { Box, Container } from "@chakra-ui/layout";
import React from "react";

interface CardProps {
	children: React.ReactNode;
}
const Card: React.FC<CardProps> = ({ children }) => {
	return (
		<Container maxW='container.lg'>
			<Box
				p='5'
				maxW='md'
				borderWidth='1px'
				borderRadius='lg'
				overflow='hidden'>
				{children}
			</Box>
		</Container>
	);
};

export default Card;
