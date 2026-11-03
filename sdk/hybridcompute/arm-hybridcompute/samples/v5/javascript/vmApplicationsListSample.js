// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the VM applications installed on a hybrid machine.
 *
 * @summary lists the VM applications installed on a hybrid machine.
 * x-ms-original-file: 2026-09-01/application/VMApplications_List.json
 */
async function listVMApplications() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vmApplications.list("myResourceGroup", "myMachine", {
    top: 100,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVMApplications();
}

main().catch(console.error);
