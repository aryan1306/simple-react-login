import { fromPromise } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const getNewToken = () => {
	return fetch("http://localhost:4000/api/refresh-token", {
		method: "POST",
		credentials: "include",
	}).then(async (res) => {
		const { accessToken } = await res.json();
		return accessToken;
	});
};
export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
	if (graphQLErrors) {
		for (let err of graphQLErrors) {
			switch (err.message) {
				case "not authenticated":
					return fromPromise(
						getNewToken().catch((_err) => {
							localStorage.clear();
						})
					)
						.filter((value) => Boolean(value))
						.flatMap((accessToken) => {
							const oldHeaders = operation.getContext().headers;
							// modify the operation context with a new token
							operation.setContext({
								headers: {
									...oldHeaders,
									authorization: `Bearer ${accessToken}`,
								},
							});

							// retry the request, returning the new observable
							return forward(operation);
						});
			}
		}
	}
});
