// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts an Agent Deployment.
 *
 * @summary starts an Agent Deployment.
 * x-ms-original-file: 2026-01-15-preview/AgentDeployment/start.json
 */
async function startAgentDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.agentDeployments.start(
    "test-rg",
    "my-cognitive-services-account",
    "my-project",
    "agent-app-1",
    "deployment-1",
  );
}

async function main(): Promise<void> {
  await startAgentDeployment();
}

main().catch(console.error);
