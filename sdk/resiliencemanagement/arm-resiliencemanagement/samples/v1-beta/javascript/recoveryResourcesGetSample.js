// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a RecoveryResource
 *
 * @summary get a RecoveryResource
 * x-ms-original-file: 2026-04-01-preview/RecoveryResources_Get_MaximumSet_Gen.json
 */
async function recoveryResourcesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryResources.get(
    "sampleServiceGroupName",
    "samplePlanName",
    "12345678-9012-3456-7890-123456789012",
  );
  console.log(result);
}

async function main() {
  await recoveryResourcesGetMaximumSet();
}

main().catch(console.error);
