// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this starts a new running instance of the Drill.
 *
 * @summary this starts a new running instance of the Drill.
 * x-ms-original-file: 2026-04-01-preview/Drills_Start_MaximumSet_Gen.json
 */
async function drillsStartMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.drills.start("sampleServiceGroupName", "qmn", "drill1", { mode: "Failover" });
}

async function main() {
  await drillsStartMaximumSet();
}

main().catch(console.error);
