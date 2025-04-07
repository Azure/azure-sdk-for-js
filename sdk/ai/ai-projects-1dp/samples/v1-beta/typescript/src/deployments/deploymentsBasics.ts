// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the AIProjectClient to manage deployments.
 * 
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all deployments,
 * get the properties of a deployment by its name, and delete a deployment.
 */

import type { Deployment } from "@azure/ai-projects-1dp";
import { AIProjectClient } from "@azure/ai-projects-1dp";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint =
  process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const apiKey = process.env["AZURE_AI_PROJECT_API_KEY"] || "<project key>";
const modelPublisher = process.env["MODEL_PUBLISHER"] || "<model publisher>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(endpoint, new AzureKeyCredential(apiKey));

  // List all deployments
  console.log("List all deployments:");
  const deployments: Deployment[] = [];
  for await (const deployment of project.deployments.list()) {
    deployments.push(deployment);
    console.log(deployment);
  }
  console.log(`Retrieved ${deployments.length} deployments`);

  // List all deployments by a specific model publisher (assuming we have one from the list)
  console.log(`List all deployments by the model publisher '${modelPublisher}':`);
  const filteredDeployments: Deployment[] = [];
  for await (const deployment of project.deployments.list({ modelPublisher })) {
    filteredDeployments.push(deployment);
    console.log(deployment);
  }
  console.log(`Retrieved ${filteredDeployments.length} deployments from model publisher '${modelPublisher}'`);

  // Get a single deployment by name
  if (deployments.length > 0) {
    const deploymentName = deployments[0].name;
    console.log(`Get a single deployment named '${deploymentName}':`);
    const singleDeployment = await project.deployments.get(deploymentName);
    console.log(singleDeployment);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
