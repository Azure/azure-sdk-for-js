// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use AIProjectClient to get the connection string for telemetry.
 * @summary Given the AIProjectClient, this sample shows how to get the connection string for telemetry.
 */

import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint string>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());

  // get connection string for application insights
  const connectionString = await project.telemetry.getApplicationInsightsConnectionString();
  console.log("Connection string for telemetry: ", connectionString);
}

main().catch((err) => {
  console.error("Error running sample:", err);
});
