// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Agent Application (asynchronous).
 *
 * @summary creates or updates an Agent Application (asynchronous).
 * x-ms-original-file: 2026-01-15-preview/AgentApplication/createOrUpdate.json
 */
async function createOrUpdateAccountAgentApplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.agentApplications.createOrUpdate(
    "test-rg",
    "my-cognitive-services-account",
    "my-project",
    "agent-app-1",
    {
      properties: {
        description: "Sample agent application for customer support",
        displayName: "Customer Support Agent",
        tags: { environment: "production", team: "ai-platform" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAccountAgentApplication();
}

main().catch(console.error);
