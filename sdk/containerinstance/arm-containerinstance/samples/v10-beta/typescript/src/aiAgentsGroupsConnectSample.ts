// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an access token and endpoint for connecting to the AiAgentsGroup.
 *
 * @summary get an access token and endpoint for connecting to the AiAgentsGroup.
 * x-ms-original-file: 2026-08-01-preview/AiAgentsGroupsConnect.json
 */
async function connectToAAiAgentsGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.aiAgentsGroups.connect("myResourceGroup", "myAiAgentsGroup");
  console.log(result);
}

async function main(): Promise<void> {
  await connectToAAiAgentsGroup();
}

main().catch(console.error);
