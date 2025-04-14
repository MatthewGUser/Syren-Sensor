import { referenceAuth } from "@aws-amplify/backend";

export const auth = referenceAuth({
	userPoolId:
		process.env.USER_POOL_ID?.toString() ??
		(() => {
			throw new Error("USER_POOL_ID is not defined");
		})(),
	identityPoolId:
		process.env.IDENTITY_POOL_ID?.toString() ??
		(() => {
			throw new Error("IDENTITY_POOL_ID is not defined");
		})(),
	authRoleArn:
		process.env.AUTH_ROLE_ARN?.toString() ??
		(() => {
			throw new Error("AUTH_ROLE_ARN is not defined");
		})(),
	unauthRoleArn:
		process.env.UNAUTH_ROLE_ARN?.toString() ??
		(() => {
			throw new Error("UNAUTH_ROLE_ARN is not defined");
		})(),
	userPoolClientId:
		process.env.USER_POOL_CLIENT_ID?.toString() ??
		(() => {
			throw new Error("USER_POOL_CLIENT_ID is not defined");
		})(),
});
