// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VirtualMachinesRedeployParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Shuts down the virtual machine, moves it to a new node, and powers it back on.
 *
 * @summary Shuts down the virtual machine, moves it to a new node, and powers it back on.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachines_Redeploy_MaximumSet_Gen.json
 */
async function virtualMachinesRedeployMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmName = "a";
  const options: VirtualMachinesRedeployParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/redeploy",
      subscriptionId,
      resourceGroupName,
      vmName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachinesRedeployMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Shuts down the virtual machine, moves it to a new node, and powers it back on.
 *
 * @summary Shuts down the virtual machine, moves it to a new node, and powers it back on.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachines_Redeploy_MinimumSet_Gen.json
 */
async function virtualMachinesRedeployMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmName = "aaaaaaaaaaaaaaa";
  const options: VirtualMachinesRedeployParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/redeploy",
      subscriptionId,
      resourceGroupName,
      vmName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachinesRedeployMinimumSetGen().catch(console.error);
