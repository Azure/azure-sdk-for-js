// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a RecoveryPlan
 *
 * @summary delete a RecoveryPlan
 * x-ms-original-file: 2026-04-01-preview/RecoveryPlans_Delete_MaximumSet_Gen.json
 */
async function recoveryPlansDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.recoveryPlans.delete("sampleServiceGroupName", "samplePlanName");
}

async function main(): Promise<void> {
  await recoveryPlansDeleteMaximumSet();
}

main().catch(console.error);
