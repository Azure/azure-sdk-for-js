// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an Agent Deployment by name.
 *
 * @summary gets an Agent Deployment by name.
 * x-ms-original-file: 2026-01-15-preview/AgentDeployment/get.json
 */
async function getAgentDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.agentDeployments.get(
    "test-rg",
    "my-cognitive-services-account",
    "my-project",
    "agent-app-1",
    "deployment-1",
  );
  console.log(result);
}

async function main() {
  await getAgentDeployment();
}

main().catch(console.error);
