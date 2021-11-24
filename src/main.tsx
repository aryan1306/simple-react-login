import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink,
	ApolloLink,
} from "@apollo/client";
import "@fontsource/inter";
import "@fontsource/montserrat";
import theme from "./theme";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "./utils/token";
import { App } from "./App";
import { errorLink } from "./utils/auth/refreshToken";
import avatar from "animal-avatar-generator";

const httpLink = new HttpLink({
	uri: "http://localhost:4000/graphql",
	credentials: "include",
});

const authLink = setContext((_, { headers }) => {
	const token = getToken();
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});
const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
	credentials: "include",
	link: ApolloLink.from([authLink, httpLink, errorLink]),
});
ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<ChakraProvider theme={theme}>
				{/* <Fragment> */}
				<App />
				<ToastContainer />
				{/* </Fragment> */}
			</ChakraProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
