// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic Red Team operations.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to create, get, and list Red Team scans.
 */

import type { RedTeam } from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelEndpoint = process.env["MODEL_ENDPOINT"] || "<model endpoint>";
const modelApiKey = process.env["MODEL_API_KEY"] || "<model api key>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

export async function main(): Promise<void> {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());

  console.log("Creating a Red Team scan for direct model testing");

  // Create the Red Team configuration
  const redTeam: RedTeam = {
    name: "", // This will be set by the service
    attackStrategies: ["base64"],
    riskCategories: ["Violence"],
    displayName: "redteamtest1",
    target: {
      type: "AzureOpenAIModel",
      modelDeploymentName: modelDeploymentName,
    },
  };

  // Create and run the Red Team scan
  const redTeamResponse = await project.redTeams.create(redTeam, {
    requestOptions: {
      headers: {
        "model-endpoint": modelEndpoint,
        "model-api-key": modelApiKey,
      },
    },
  });
  console.log(`Red Team scan created with scan name: ${redTeamResponse.name}`);

  console.log("Getting Red Team scan details");
  // Use the name returned by the create operation for the get call
  const getRedTeamResponse = await project.redTeams.get(redTeamResponse.name);
  console.log(`Red Team scan status: ${getRedTeamResponse.status}`);

  console.log("Listing all Red Team scans");
  for await (const scan of project.redTeams.list()) {
    console.log(`Found scan: ${scan.name}, Status: ${scan.status}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
