// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to triggers resource discovery for the workspace.
 *
 * @summary triggers resource discovery for the workspace.
 * x-ms-original-file: 2026-08-01-preview/Workspaces_Discover.json
 */
async function triggerResourceDiscoveryForTheWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.discover("exampleRG", "exampleWorkspace");
  console.log(result);
}

async function main(): Promise<void> {
  await triggerResourceDiscoveryForTheWorkspace();
}

main().catch(console.error);
