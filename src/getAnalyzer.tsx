import { AccessAnalyzerClient, GetAnalyzerCommand } from "@aws-sdk/client-accessanalyzer"; // ES Modules import
// const { AccessAnalyzerClient, GetAnalyzerCommand } = require("@aws-sdk/client-accessanalyzer"); // CommonJS import
const client = new AccessAnalyzerClient(config);
const input = { // GetAnalyzerRequest
  analyzerName: "STRING_VALUE", // required
};
const command = new GetAnalyzerCommand(input);
const response = await client.send(command);