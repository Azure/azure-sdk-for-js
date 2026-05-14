// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops an Agent Deployment.
 *
 * @summary stops an Agent Deployment.
 * x-ms-original-file: 2026-01-15-preview/AgentDeployment/stop.json
 */
async function stopAgentDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.agentDeployments.stop(
    "test-rg",
    "my-cognitive-services-account",
    "my-project",
    "agent-app-1",
    "deployment-1",
  );
}

async function main(): Promise<void> {
  await stopAgentDeployment();
}

main().catch(console.error);
