// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Drill resources by tenant
 *
 * @summary list Drill resources by tenant
 * x-ms-original-file: 2026-04-01-preview/Drills_List_MaximumSet_Gen.json
 */
async function drillsListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.drills.list("sampleServiceGroupName", {
    skipToken: "xntbyoswztnmvitj",
    top: 69,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await drillsListMaximumSet();
}

main().catch(console.error);
