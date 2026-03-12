// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves information about the model view or the instance view of a hybrid machine.
 *
 * @summary Retrieves information about the model view or the instance view of a hybrid machine.
 * x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/preview/2025-02-19-preview/examples/machine/Machines_Get.json
 */

import {
  MachinesGetOptionalParams,
  HybridComputeManagementClient,
} from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getMachine(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDCOMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const resourceGroupName =
    process.env["HYBRIDCOMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const machineName = "myMachine";
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.machines.get(resourceGroupName, machineName);
  console.log(result);
}

/**
 * This sample demonstrates how to Retrieves information about the model view or the instance view of a hybrid machine.
 *
 * @summary Retrieves information about the model view or the instance view of a hybrid machine.
 * x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/preview/2025-02-19-preview/examples/machine/Machines_Get_LicenseProfileInstanceView.json
 */
async function getMachineWithLicenseProfileInstanceView(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDCOMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const resourceGroupName =
    process.env["HYBRIDCOMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const machineName = "myMachine";
  const expand = "instanceView";
  const options: MachinesGetOptionalParams = { expand };
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.machines.get(
    resourceGroupName,
    machineName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getMachine();
  await getMachineWithLicenseProfileInstanceView();
}

main().catch(console.error);
