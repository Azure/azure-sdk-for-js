// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkParameters,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Manual platform update domain walk to update virtual machines in a service fabric virtual machine scale set.
 *
 * @summary Manual platform update domain walk to update virtual machines in a service fabric virtual machine scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_ForceRecoveryServiceFabricPlatformUpdateDomainWalk_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkParameters = {
    queryParameters: { "api-version": "2022-08-01", platformUpdateDomain: 30 },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/forceRecoveryServiceFabricPlatformUpdateDomainWalk",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName
    )
    .post(options);
  console.log(result);
}

virtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkMaximumSetGen().catch(
  console.error
);
/**
 * This sample demonstrates how to Manual platform update domain walk to update virtual machines in a service fabric virtual machine scale set.
 *
 * @summary Manual platform update domain walk to update virtual machines in a service fabric virtual machine scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_ForceRecoveryServiceFabricPlatformUpdateDomainWalk_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaa";
  const options: VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkParameters = {
    queryParameters: { "api-version": "2022-08-01", platformUpdateDomain: 9 },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/forceRecoveryServiceFabricPlatformUpdateDomainWalk",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName
    )
    .post(options);
  console.log(result);
}

virtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkMinimumSetGen().catch(
  console.error
);
