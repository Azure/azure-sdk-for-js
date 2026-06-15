// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of Action Version resources for a given location and action.
 *
 * @summary get a list of Action Version resources for a given location and action.
 * x-ms-original-file: 2026-05-01-preview/ActionVersions_List.json
 */
async function listAllActionVersionsForAGivenAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.actionVersions.list("westus2", "microsoft-compute-shutdown")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllActionVersionsForAGivenAction();
}

main().catch(console.error);
