// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Drill
 *
 * @summary get a Drill
 * x-ms-original-file: 2026-04-01-preview/Drills_Get_MaximumSet_Gen.json
 */
async function drillsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.drills.get("sampleServiceGroupName", "drill1");
  console.log(result);
}

async function main(): Promise<void> {
  await drillsGetMaximumSet();
}

main().catch(console.error);
