// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  VMScaleSetScaleOutInput,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Scales out one or more virtual machines in a VM scale set.
 *
 * @summary Scales out one or more virtual machines in a VM scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSet_ScaleOut.json
 */
async function virtualMachineScaleSetScaleOut(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const vmScaleSetName = "{vmss-name}";
  const parameters: VMScaleSetScaleOutInput = {
    capacity: 5,
    properties: { zone: "1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.beginScaleOutAndWait(
    resourceGroupName,
    vmScaleSetName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetScaleOut();
}

main().catch(console.error);
