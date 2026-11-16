// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Workspace
 *
 * @summary get a Workspace
 * x-ms-original-file: 2026-06-01/Workspaces_Get_MaximumSet_Gen.json
 */
async function workspacesGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.workspaces.get("rgdiscovery", "7c14ca107f929876a0");
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesGetMaximumSet();
}

main().catch(console.error);
