// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Changes ServiceState property for a given service
 *
 * @summary Changes ServiceState property for a given service
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_SetOrchestrationServiceState_MaximumSet_Gen.json
 */

import type { VirtualMachineScaleSetsSetOrchestrationServiceStateParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function virtualMachineScaleSetsSetOrchestrationServiceStateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetsSetOrchestrationServiceStateParameters = {
    body: { action: "Resume", serviceName: "AutomaticRepairs" },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/setOrchestrationServiceState",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetsSetOrchestrationServiceStateMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Changes ServiceState property for a given service
 *
 * @summary Changes ServiceState property for a given service
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_SetOrchestrationServiceState_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetsSetOrchestrationServiceStateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetsSetOrchestrationServiceStateParameters = {
    body: { action: "Resume", serviceName: "AutomaticRepairs" },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/setOrchestrationServiceState",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetsSetOrchestrationServiceStateMinimumSetGen().catch(console.error);
