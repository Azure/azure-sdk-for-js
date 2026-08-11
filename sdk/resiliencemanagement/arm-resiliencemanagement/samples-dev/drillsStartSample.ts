// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this starts a new running instance of the Drill.
 *
 * @summary this starts a new running instance of the Drill.
 * x-ms-original-file: 2026-04-01-preview/Drills_Start_MaximumSet_Gen.json
 */
async function drillsStartMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.drills.start("sampleServiceGroupName", "qmn", "drill1", { mode: "Failover" });
}

async function main(): Promise<void> {
  await drillsStartMaximumSet();
}

main().catch(console.error);
