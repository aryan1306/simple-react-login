import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "@fontsource/inter";
import "@fontsource/montserrat";
import theme from "./theme";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { App } from "./App";

const client = new ApolloClient({
	// uri: "https://login.api-save-more.me/graphql",
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
	credentials: "include",
});
ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<ChakraProvider theme={theme}>
				<App />
				<ToastContainer />
			</ChakraProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
