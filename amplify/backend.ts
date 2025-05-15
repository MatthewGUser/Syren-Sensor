import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
// import { data } from "./data/resource";
// import { simulateWearableUpload } from "./functions/simulateWearableUpload/resource";
// import { seedWearableData } from "./functions/seedWearableData/resource";
// import { processWearableData } from "./functions/processWearableData/resource";

defineBackend({
	auth,
	// data,
	// simulateWearableUpload,
	// seedWearableData,
	// processWearableData
});