// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a VM application.
 *
 * @summary updates a VM application.
 * x-ms-original-file: 2026-09-01/application/VMApplications_Update.json
 */
async function updateAVMApplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.vmApplications.update(
    "myResourceGroup",
    "myMachine",
    "myApplication",
    {
      tags: { environment: "staging" },
      properties: { order: 2, treatFailureAsDeploymentFailure: false },
    },
  );
  console.log(result);
}

async function main() {
  await updateAVMApplication();
}

main().catch(console.error);
