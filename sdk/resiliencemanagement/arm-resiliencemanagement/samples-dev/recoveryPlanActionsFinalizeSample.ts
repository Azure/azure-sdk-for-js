// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this action finalizes the recovery orchestration plan, ensuring all necessary configurations are in place.
 *
 * @summary this action finalizes the recovery orchestration plan, ensuring all necessary configurations are in place.
 * x-ms-original-file: 2026-04-01-preview/RecoveryPlanActions_Finalize_MaximumSet_Gen.json
 */
async function recoveryPlanActionsFinalizeMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryPlanActions.finalize(
    "sampleServiceGroupName",
    "samplePlanName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await recoveryPlanActionsFinalizeMaximumSet();
}

main().catch(console.error);
