import React from "react";
import ReactDOM from "react-dom";
import { Routes } from "./Routes";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "@fontsource/inter";
import "@fontsource/montserrat";
import theme from "./theme";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
});
ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<ChakraProvider theme={theme}>
				<Routes />
			</ChakraProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
