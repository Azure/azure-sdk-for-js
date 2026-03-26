// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an Agent Application by name.
 *
 * @summary gets an Agent Application by name.
 * x-ms-original-file: 2026-01-15-preview/AgentApplication/get.json
 */
async function getAccountAgentApplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.agentApplications.get(
    "test-rg",
    "my-cognitive-services-account",
    "my-project",
    "agent-app-1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAccountAgentApplication();
}

main().catch(console.error);
