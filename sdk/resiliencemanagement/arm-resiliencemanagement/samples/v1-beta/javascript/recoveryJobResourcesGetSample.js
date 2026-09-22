// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a RecoveryJobResource
 *
 * @summary get a RecoveryJobResource
 * x-ms-original-file: 2026-04-01-preview/RecoveryJobResources_Get_MaximumSet_Gen.json
 */
async function recoveryJobResourcesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryJobResources.get(
    "sampleServiceGroupName",
    "samplePlanName",
    "c56888ef-9ced-4001-a6d4-7145a0309bdb",
    "56f942da-a30e-43c0-b5f0-1c22e44f2d94",
  );
  console.log(result);
}

async function main() {
  await recoveryJobResourcesGetMaximumSet();
}

main().catch(console.error);
