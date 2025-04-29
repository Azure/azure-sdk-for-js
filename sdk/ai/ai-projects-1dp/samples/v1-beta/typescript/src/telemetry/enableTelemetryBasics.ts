// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to enable telemetry for the AIProjectClient and send telemetry events to stdout.
 */

import { AIProjectClient } from "@azure/ai-projects-1dp";
import { DefaultAzureCredential } from "@azure/identity";
import { context } from "@opentelemetry/api";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const deploymentName = process.env["DEPLOYMENT_NAME"] || "<deployment name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
  // Enable telemetry to stdout. This will print telemetry events to the console.
  project.enableTelemetry("stdout");

  const client = project.inference.chatCompletions();
  const response = await client.post({
    body: {
      model: deploymentName,
      messages: [
        { role: "system", content: "You are a helpful assistant. You will talk like a pirate." }, // System role not supported for some models
        { role: "user", content: "How many feet are in a mile?" },
      ],
    },
    tracingOptions: { tracingContext: context.active() }, // Pass the current tracing context to the API call
  });

  console.log("response = ", JSON.stringify(response, null, 2));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
