// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all private link resources for the workspace.
 *
 * @summary lists all private link resources for the workspace.
 * x-ms-original-file: 2026-06-01/WorkspacePrivateLinkResources_ListByWorkspace_MaximumSet_Gen.json
 */
async function workspacePrivateLinkResourcesListByWorkspaceMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspacePrivateLinkResources.listByWorkspace(
    "rgdiscovery",
    "9aa6a22ca481a4fa4e",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await workspacePrivateLinkResourcesListByWorkspaceMaximumSet();
}

main().catch(console.error);
