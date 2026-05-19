// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Agent Deployment.
 *
 * @summary delete Agent Deployment.
 * x-ms-original-file: 2026-01-15-preview/AgentDeployment/delete.json
 */
async function deleteAgentDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.agentDeployments.delete(
    "test-rg",
    "my-cognitive-services-account",
    "my-project",
    "agent-app-1",
    "deployment-1",
  );
}

async function main() {
  await deleteAgentDeployment();
}

main().catch(console.error);
