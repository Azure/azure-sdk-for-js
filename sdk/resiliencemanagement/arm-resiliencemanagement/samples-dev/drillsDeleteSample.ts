// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Drill
 *
 * @summary delete a Drill
 * x-ms-original-file: 2026-04-01-preview/Drills_Delete_MaximumSet_Gen.json
 */
async function drillsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.drills.delete("sampleServiceGroupName", "drill1");
}

async function main(): Promise<void> {
  await drillsDeleteMaximumSet();
}

main().catch(console.error);
