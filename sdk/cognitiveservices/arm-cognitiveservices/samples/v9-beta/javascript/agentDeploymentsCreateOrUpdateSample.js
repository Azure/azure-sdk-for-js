// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an Agent Deployment (asynchronous).
 *
 * @summary creates or updates an Agent Deployment (asynchronous).
 * x-ms-original-file: 2026-01-15-preview/AgentDeployment/createOrUpdate.json
 */
async function createOrUpdateAgentDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.agentDeployments.createOrUpdate(
    "test-rg",
    "my-cognitive-services-account",
    "my-project",
    "agent-app-1",
    "deployment-1",
    {
      properties: {
        agents: [{ agentId: "agent-123", agentName: "support-agent", agentVersion: "1.0.0" }],
        deploymentType: "Managed",
        displayName: "Production Deployment",
        protocols: [{ version: "1.0", protocol: "Agent" }],
        state: "Starting",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAgentDeployment();
}

main().catch(console.error);
