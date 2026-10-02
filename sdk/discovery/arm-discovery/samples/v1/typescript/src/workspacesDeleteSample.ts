// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Workspace
 *
 * @summary delete a Workspace
 * x-ms-original-file: 2026-06-01/Workspaces_Delete_MaximumSet_Gen.json
 */
async function workspacesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.workspaces.delete("rgdiscovery", "d70f215a9c483cbd5c");
}

async function main(): Promise<void> {
  await workspacesDeleteMaximumSet();
}

main().catch(console.error);
