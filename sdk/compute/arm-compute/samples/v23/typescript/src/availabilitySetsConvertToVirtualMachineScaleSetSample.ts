// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ConvertToVirtualMachineScaleSetInput,
  AvailabilitySetsConvertToVirtualMachineScaleSetOptionalParams,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a new Flexible Virtual Machine Scale Set and migrate all the Virtual Machines in the Availability Set. This does not trigger a downtime on the Virtual Machines.
 *
 * @summary Create a new Flexible Virtual Machine Scale Set and migrate all the Virtual Machines in the Availability Set. This does not trigger a downtime on the Virtual Machines.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/availabilitySetExamples/AvailabilitySet_ConvertToVirtualMachineScaleSet.json
 */
async function availabilitySetConvertToVirtualMachineScaleSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const availabilitySetName = "myAvailabilitySet";
  const parameters: ConvertToVirtualMachineScaleSetInput = {
    virtualMachineScaleSetName: "{vmss-name}",
  };
  const options: AvailabilitySetsConvertToVirtualMachineScaleSetOptionalParams =
    { parameters };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result =
    await client.availabilitySets.beginConvertToVirtualMachineScaleSetAndWait(
      resourceGroupName,
      availabilitySetName,
      options,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await availabilitySetConvertToVirtualMachineScaleSetGen();
}

main().catch(console.error);
