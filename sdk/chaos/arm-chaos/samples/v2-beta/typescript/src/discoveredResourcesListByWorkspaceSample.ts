// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of discovered resources for a workspace.
 *
 * @summary get a list of discovered resources for a workspace.
 * x-ms-original-file: 2026-05-01-preview/DiscoveredResources_ListByWorkspace.json
 */
async function getAListOfDiscoveredResourcesForAWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.discoveredResources.listByWorkspace(
    "exampleRG",
    "exampleWorkspace",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfDiscoveredResourcesForAWorkspace();
}

main().catch(console.error);
