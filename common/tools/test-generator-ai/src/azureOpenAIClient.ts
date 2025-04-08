import { config } from "dotenv";
import { AzureKeyCredential } from "@azure/core-auth";
import getClient from "@azure-rest/ai-inference";

config();

const azureOpenAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
const azureOpenAIKey = process.env.AZURE_OPENAI_KEY;

if (!azureOpenAIEndpoint || !azureOpenAIKey) {
  throw new Error("Azure OpenAI credentials are not fully configured in .env file.");
}

export const inferenceClient = getClient(
  azureOpenAIEndpoint,
  new AzureKeyCredential(azureOpenAIKey)
);

// // Function to get and log OpenAI client info
// export async function logOpenAIClientInfo(): Promise<void> {
//   console.log(await inferenceClient.path("/info").get({ headers: { "x-ms-model-mesh-model-name": process.env.AZURE_OPENAI_MODEL_NAME } }));
// }

// logOpenAIClientInfo();
