// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DrillRun resources by Drill
 *
 * @summary list DrillRun resources by Drill
 * x-ms-original-file: 2026-04-01-preview/DrillRuns_List_MaximumSet_Gen.json
 */
async function drillRunsListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.drillRuns.list("sampleServiceGroupName", "drill1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await drillRunsListMaximumSet();
}

main().catch(console.error);
