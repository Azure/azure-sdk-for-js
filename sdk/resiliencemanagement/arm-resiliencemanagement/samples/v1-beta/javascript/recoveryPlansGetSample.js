// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a RecoveryPlan
 *
 * @summary get a RecoveryPlan
 * x-ms-original-file: 2026-04-01-preview/RecoveryPlans_Get_MaximumSet_Gen.json
 */
async function recoveryPlansGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryPlans.get("sampleServiceGroupName", "samplePlanName");
  console.log(result);
}

async function main() {
  await recoveryPlansGetMaximumSet();
}

main().catch(console.error);
