// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a GoalTemplate
 *
 * @summary delete a GoalTemplate
 * x-ms-original-file: 2026-04-01-preview/GoalTemplates_Delete_MaximumSet_Gen.json
 */
async function goalTemplatesDeleteMaximumSet(): Promise<void> {
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
async function goalTemplatesDeleteMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalTemplates.delete("sg1", "gt1");
}

async function main(): Promise<void> {
  await goalTemplatesDeleteMaximumSet();
  await goalTemplatesDeleteMinimumSet();
}

main().catch(console.error);
