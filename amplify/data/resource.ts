// import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

// const schema = a.schema({
//   Todo: a
//     .model({
//       content: a.string(),
//     })
//     .authorization((allow) => [allow.owner()]),

//   HealthSnapshot: a
//     .model({
//       userID: a.id(),
//       heartRate: a.integer(),
//       oxygenLevel: a.integer(),
//       timestamp: a.timestamp(),
//     })
//     .authorization((allow) => [allow.owner()])
//     .secondaryIndexes((index) => [
//       index("userID").sortKeys(["timestamp"])
//     ]),

//   WearableRawData: a
//     .model({
//       userID: a.id(),
//       timestamp: a.timestamp(),
//       rawHeartRate: a.integer(),
//       rawO2: a.integer(),
//       processed: a.boolean(),
//     })
//     .authorization((allow) => [allow.owner()])
//     .secondaryIndexes((index) => [
//       index("userID").sortKeys(["timestamp"])
//     ]),

// });

// export type Schema = ClientSchema<typeof schema>;

// export const data = defineData({
//   schema,
//   authorizationModes: {
//     defaultAuthorizationMode: "userPool",
//   },
// });

// import { defineData } from "@aws-amplify/backend";
// import { schema} from "./schema"; // ✅ pull from schema file

// export const data = defineData({
//   schema,
//   authorizationModes: {
//     defaultAuthorizationMode: "userPool",
//   },
// } as const);