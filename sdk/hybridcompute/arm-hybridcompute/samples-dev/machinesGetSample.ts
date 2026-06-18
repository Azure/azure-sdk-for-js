// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves information about the model view or the instance view of a hybrid machine.
 *
 * @summary retrieves information about the model view or the instance view of a hybrid machine.
 * x-ms-original-file: 2025-09-16-preview/machine/Machines_Get.json
 */
async function getMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.machines.get("myResourceGroup", "myMachine");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about the model view or the instance view of a hybrid machine.
 *
 * @summary retrieves information about the model view or the instance view of a hybrid machine.
 * x-ms-original-file: 2025-09-16-preview/machine/Machines_Get_LicenseProfileInstanceView.json
 */
async function getMachineWithLicenseProfileInstanceView(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.machines.get("myResourceGroup", "myMachine", {
    expand: "instanceView",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getMachine();
  await getMachineWithLicenseProfileInstanceView();
}

main().catch(console.error);
