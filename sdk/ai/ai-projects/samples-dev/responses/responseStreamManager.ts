// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a basic streaming responses operation
 * using the OpenAI client `.responses.stream()` method.
 *
 * See also https://platform.openai.com/docs/api-reference/responses/create
 *
 * Note also the alternative streaming approach shown in responseStream.ts.
 *
 * @summary This sample demonstrates how to use the responses stream manager
 * for streaming responses.
 *
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create OpenAI client with Azure credentials
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Create a streaming response using the stream manager
  const responseStreamManager = openAIClient.responses.stream({
    model: deploymentName,
    input: [{ role: "user", content: "Tell me about the capital city of France" }],
  });

  // Process streaming events as they arrive
  for await (const event of responseStreamManager) {
    if (event.type === "response.created") {
      console.log(`Stream response created with ID: ${event.response.id}\n`);
    } else if (event.type === "response.output_text.delta") {
      process.stdout.write(event.delta);
    } else if (event.type === "response.output_text.done") {
      console.log(`\n\nResponse text done. Access final text in 'event.text'`);
    } else if (event.type === "response.completed") {
      console.log(`\n\nResponse completed. Access final text in 'event.response.output_text'`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
