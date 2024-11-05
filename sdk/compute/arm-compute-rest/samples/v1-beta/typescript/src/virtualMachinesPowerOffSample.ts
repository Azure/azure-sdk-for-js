// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachinesPowerOffParameters,
  getLongRunningPoller
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to The operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine.
 *
 * @summary The operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachines_PowerOff_MaximumSet_Gen.json
 */
async function virtualMachinesPowerOffMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmName = "aaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachinesPowerOffParameters = {
    queryParameters: { skipShutdown: true, "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/powerOff",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachinesPowerOffMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to The operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine.
 *
 * @summary The operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachines_PowerOff_MinimumSet_Gen.json
 */
async function virtualMachinesPowerOffMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmName = "aaaaaaaaaaaaaaaaaa";
  const options: VirtualMachinesPowerOffParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/powerOff",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachinesPowerOffMinimumSetGen().catch(console.error);
