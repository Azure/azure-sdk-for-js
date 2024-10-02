// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineScaleSetsUpdateInstancesParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 *
 * @summary Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_UpdateInstances_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetsUpdateInstancesMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetsUpdateInstancesParameters = {
    body: { instanceIds: ["aaaaaaaaaaaaaaaaaaaaaaaaa"] },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/manualupgrade",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetsUpdateInstancesMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 *
 * @summary Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_UpdateInstances_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetsUpdateInstancesMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetsUpdateInstancesParameters = {
    body: { instanceIds: ["aaaaaaaaaaaaaaaaaaaaaaaaa"] },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/manualupgrade",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetsUpdateInstancesMinimumSetGen().catch(console.error);
