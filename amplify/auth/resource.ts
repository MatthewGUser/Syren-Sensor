import { referenceAuth, secret } from "@aws-amplify/backend";

const userPoolId = secret("COGNITO_USER_POOL_ID").toString();
const identityPoolId = secret("COGNITO_IDENTITY_POOL_ID").toString();
const userPoolClientId = secret("COGNITO_USER_POOL_CLIENT_ID").toString();
const authRoleArn = secret("COGNITO_AUTH_ROLE_ARN").toString();
const unauthRoleArn = secret("COGNITO_UNAUTH_ROLE_ARN").toString();

export const auth = referenceAuth({
	userPoolId,
	identityPoolId,
	userPoolClientId,
	authRoleArn,
	unauthRoleArn,
});
