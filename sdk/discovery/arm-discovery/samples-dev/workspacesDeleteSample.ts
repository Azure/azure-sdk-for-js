// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Workspace
 *
 * @summary delete a Workspace
 * x-ms-original-file: 2026-02-01-preview/Workspaces_Delete_MaximumSet_Gen.json
 */
async function workspacesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.workspaces.delete("rgdiscovery", "f1559ab1ef72a2eae5");
}

async function main(): Promise<void> {
  await workspacesDeleteMaximumSet();
}

main().catch(console.error);
