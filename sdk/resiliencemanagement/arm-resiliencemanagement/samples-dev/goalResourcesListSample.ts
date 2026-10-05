// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists goal resources under a goal assignment.
 *
 * @summary lists goal resources under a goal assignment.
 * x-ms-original-file: 2026-10-31-preview/GoalResources_List_MaximumSet_Gen.json
 */
async function goalResourcesListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.goalResources.list("sg1", "ga1", {
    skipToken: "xntbyoswztnmvitj",
    top: 69,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await goalResourcesListMaximumSet();
}

main().catch(console.error);
