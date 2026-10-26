// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a VM application.
 *
 * @summary deletes a VM application.
 * x-ms-original-file: 2026-09-01/application/VMApplications_Delete.json
 */
async function deleteAVMApplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  await client.vmApplications.delete("myResourceGroup", "myMachine", "myApplication");
}

async function main() {
  await deleteAVMApplication();
}

main().catch(console.error);
