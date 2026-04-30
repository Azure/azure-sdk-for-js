// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all private link resources for the workspace.
 *
 * @summary lists all private link resources for the workspace.
 * x-ms-original-file: 2026-02-01-preview/WorkspacePrivateLinkResources_ListByWorkspace_MaximumSet_Gen.json
 */
async function workspacePrivateLinkResourcesListByWorkspaceMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspacePrivateLinkResources.listByWorkspace(
    "rgdiscovery",
    "3a737dc9780bdefdff",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await workspacePrivateLinkResourcesListByWorkspaceMaximumSet();
}

main().catch(console.error);
