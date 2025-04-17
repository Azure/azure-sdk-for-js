// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a chat completion using the Azure OpenAI client.
 * @summary Given an AIProjectClient, this sample demonstrates how to get an Azure OpenAI client and create a chat completion.
 */

import { AIProjectClient } from "@azure/ai-projects-1dp";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const deploymentName = process.env["DEPLOYMENT_NAME"] || "<deployment name>";

export async function main(): Promise<void> {
    const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
    const client = await project.inference.azureOpenAI();
    const response = await client.chat.completions.create({
      model: deploymentName,
      messages: [
        { role: "system", content: "You are a helpful assistant. You will talk like a pirate." }, // System role not supported for some models
        { role: "user", content: "Tell me a joke?" },
      ],
    });

    console.log(response);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
