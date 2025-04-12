import { referenceAuth } from "@aws-amplify/backend";

export const auth = referenceAuth({
	userPoolId: "us-east-1_XlaObV4IZ",
	identityPoolId: "us-east-1:bdc6206d-a44b-420c-bb3d-d24b2f24dd72",
	authRoleArn: "arn:aws:iam::767398061569:role/service-role/syren-identity-pool",
	unauthRoleArn:
		"arn:aws:iam::767398061569:role/service-role/syren-identity-guest",
	userPoolClientId: "4f2vad1m9feimkd77f3auj3fdd",
});
