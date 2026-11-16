// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the instance view of a VM application.
 *
 * @summary gets the instance view of a VM application.
 * x-ms-original-file: 2026-09-01/application/VMApplications_GetInstanceView.json
 */
async function getTheInstanceViewOfAVMApplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.vmApplications.getInstanceView(
    "myResourceGroup",
    "myMachine",
    "myApplication",
  );
  console.log(result);
}

async function main() {
  await getTheInstanceViewOfAVMApplication();
}

main().catch(console.error);
