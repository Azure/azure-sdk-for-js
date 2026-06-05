// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Project resources by Workspace
 *
 * @summary list Project resources by Workspace
 * x-ms-original-file: 2026-02-01-preview/Projects_ListByWorkspace_MaximumSet_Gen.json
 */
async function projectsListByWorkspaceMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projects.listByWorkspace("rgdiscovery", "56c2d23d65c9121656")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await projectsListByWorkspaceMaximumSet();
}

main().catch(console.error);
