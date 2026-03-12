// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic Red Team operations.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to create, get, and list Red Team scans.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelEndpoint = process.env["MODEL_ENDPOINT"] || "<model endpoint>";
const modelApiKey = process.env["MODEL_API_KEY"] || "<model api key>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Creating a Red Team scan for direct model testing");

  // Create the Red Team configuration
  const redTeam = {
    name: "", // This will be set by the service
    attackStrategies: ["base64"],
    riskCategories: ["Violence"],
    displayName: "redteamtest1",
    target: {
      type: "AzureOpenAIModel",
      modelDeploymentName: deploymentName,
    },
  };

  // Create and run the Red Team scan
  const redTeamResponse = await project.beta.redTeams.create(redTeam, {
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
  const getRedTeamResponse = await project.beta.redTeams.get(redTeamResponse.name);
  console.log(`Red Team scan status: ${getRedTeamResponse.status}`);

  console.log("Listing all Red Team scans");
  for await (const scan of project.beta.redTeams.list()) {
    console.log(`Found scan: ${scan.name}, Status: ${scan.status}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
