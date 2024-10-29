// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineScaleSetRollingUpgradesGetLatestParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets the status of the latest virtual machine scale set rolling upgrade.
 *
 * @summary Gets the status of the latest virtual machine scale set rolling upgrade.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetRollingUpgrades_GetLatest_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetRollingUpgradesGetLatestMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetRollingUpgradesGetLatestParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/rollingUpgrades/latest",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName
    )
    .get(options);
  console.log(result);
}

virtualMachineScaleSetRollingUpgradesGetLatestMaximumSetGen().catch(
  console.error
);
/**
 * This sample demonstrates how to Gets the status of the latest virtual machine scale set rolling upgrade.
 *
 * @summary Gets the status of the latest virtual machine scale set rolling upgrade.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetRollingUpgrades_GetLatest_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetRollingUpgradesGetLatestMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetRollingUpgradesGetLatestParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/rollingUpgrades/latest",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName
    )
    .get(options);
  console.log(result);
}

virtualMachineScaleSetRollingUpgradesGetLatestMinimumSetGen().catch(
  console.error
);
