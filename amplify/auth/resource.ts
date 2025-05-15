import { referenceAuth } from "@aws-amplify/backend";
import "dotenv/config";

const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not defined in environment variables`);
  }
  return value;
};

export const auth = referenceAuth({
  userPoolId: getEnvVar("MY_USER_POOL_ID"),
  identityPoolId: getEnvVar("MY_IDENTITY_POOL_ID"),
  userPoolClientId: getEnvVar("MY_USER_POOL_CLIENT_ID"),
  authRoleArn: getEnvVar("MY_AUTH_ROLE_ARN"),
  unauthRoleArn: getEnvVar("MY_UNAUTH_ROLE_ARN"),
});