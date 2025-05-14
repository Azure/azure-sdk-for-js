// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the AIProjectClient to manage deployments.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all deployments,
 * get the properties of a deployment by its name, and delete a deployment.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const modelPublisher = process.env["MODEL_PUBLISHER"] || "<model publisher>";

async function main() {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());

  // List all deployments
  console.log("List all deployments:");
  const deployments = [];
  const properties = [];

  for await (const deployment of project.deployments.list()) {
    // Check if this is a ModelDeployment (has the required properties)
    if (
      deployment.type === "ModelDeployment" &&
      "modelName" in deployment &&
      "modelPublisher" in deployment &&
      "modelVersion" in deployment
    ) {
      deployments.push(deployment);
      properties.push({
        name: deployment.name,
        modelPublisher: deployment.modelPublisher,
        modelName: deployment.modelName,
      });
    }
  }
  console.log(`Retrieved deployments: ${JSON.stringify(properties, null, 2)}`);

  // List all deployments by a specific model publisher (assuming we have one from the list)
  console.log(`List all deployments by the model publisher '${modelPublisher}':`);
  const filteredDeployments = [];
  for await (const deployment of project.deployments.list({
    modelPublisher,
  })) {
    // Check if this is a ModelDeployment
    if (
      deployment.type === "ModelDeployment" &&
      "modelName" in deployment &&
      "modelPublisher" in deployment &&
      "modelVersion" in deployment
    ) {
      filteredDeployments.push(deployment);
    }
  }
  console.log(
    `Retrieved ${filteredDeployments.length} deployments from model publisher '${modelPublisher}'`,
  );

  // Get a single deployment by name
  if (deployments.length > 0) {
    const deploymentName = deployments[0].name;
    console.log(`Get a single deployment named '${deploymentName}':`);
    const singleDeployment = await project.deployments.get(deploymentName);
    console.log(`Retrieved deployment: ${JSON.stringify(singleDeployment, null, 2)}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
