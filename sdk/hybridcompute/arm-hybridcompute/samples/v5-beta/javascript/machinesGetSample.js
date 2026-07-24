// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves information about the model view or the instance view of a hybrid machine.
 *
 * @summary retrieves information about the model view or the instance view of a hybrid machine.
 * x-ms-original-file: 2026-06-16-preview/machine/Machines_Get.json
 */
async function getMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.machines.get("myResourceGroup", "myMachine");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about the model view or the instance view of a hybrid machine.
 *
 * @summary retrieves information about the model view or the instance view of a hybrid machine.
 * x-ms-original-file: 2026-06-16-preview/machine/Machines_Get_LicenseProfileInstanceView.json
 */
async function getMachineWithLicenseProfileInstanceView() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.machines.get("myResourceGroup", "myMachine", {
    expand: "instanceView",
  });
  console.log(result);
}

async function main() {
  await getMachine();
  await getMachineWithLicenseProfileInstanceView();
}

main().catch(console.error);
