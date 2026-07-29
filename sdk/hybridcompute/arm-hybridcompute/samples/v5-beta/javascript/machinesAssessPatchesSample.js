// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to assess patches on a hybrid machine identity in Azure.
 *
 * @summary the operation to assess patches on a hybrid machine identity in Azure.
 * x-ms-original-file: 2026-06-16-preview/machine/Machine_AssessPatches.json
 */
async function assessPatchStateOfAMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.machines.assessPatches("myResourceGroupName", "myMachineName");
  console.log(result);
}

async function main() {
  await assessPatchStateOfAMachine();
}

main().catch(console.error);
