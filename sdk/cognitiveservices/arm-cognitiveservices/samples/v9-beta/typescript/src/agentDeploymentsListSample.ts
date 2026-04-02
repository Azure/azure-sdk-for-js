// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists Agent Deployments in the application.
 *
 * @summary lists Agent Deployments in the application.
 * x-ms-original-file: 2026-01-15-preview/AgentDeployment/list.json
 */
async function listAgentDeployments(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.agentDeployments.list(
    "test-rg",
    "my-cognitive-services-account",
    "my-project",
    "agent-app-1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAgentDeployments();
}

main().catch(console.error);
