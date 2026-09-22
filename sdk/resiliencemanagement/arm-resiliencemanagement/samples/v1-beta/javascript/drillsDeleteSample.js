// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Drill
 *
 * @summary delete a Drill
 * x-ms-original-file: 2026-04-01-preview/Drills_Delete_MaximumSet_Gen.json
 */
async function drillsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.drills.delete("sampleServiceGroupName", "drill1");
}

async function main() {
  await drillsDeleteMaximumSet();
}

main().catch(console.error);
