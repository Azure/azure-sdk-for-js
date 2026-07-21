// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a GoalTemplate
 *
 * @summary delete a GoalTemplate
 * x-ms-original-file: 2026-04-01-preview/GoalTemplates_Delete_MaximumSet_Gen.json
 */
async function goalTemplatesDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalTemplates.delete("ajsvdpsdgp", "gt1");
}

/**
 * This sample demonstrates how to delete a GoalTemplate
 *
 * @summary delete a GoalTemplate
 * x-ms-original-file: 2026-04-01-preview/GoalTemplates_Delete_MinimumSet_Gen.json
 */
async function goalTemplatesDeleteMinimumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalTemplates.delete("sg1", "gt1");
}

async function main() {
  await goalTemplatesDeleteMaximumSet();
  await goalTemplatesDeleteMinimumSet();
}

main().catch(console.error);
