// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to update an extension.
 *
 * @summary The operation to update an extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtensions_Update_MaximumSet_Gen.json
 */

import type { VirtualMachineScaleSetExtensionsUpdateParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function virtualMachineScaleSetExtensionsUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const vmssExtensionName = "aaaa";
  const options: VirtualMachineScaleSetExtensionsUpdateParameters = {
    body: {
      properties: {
        type: "{extension-Type}",
        autoUpgradeMinorVersion: true,
        enableAutomaticUpgrade: true,
        forceUpdateTag: "aaaaaaaaa",
        protectedSettings: {},
        provisionAfterExtensions: ["aa"],
        publisher: "{extension-Publisher}",
        settings: {},
        suppressFailures: true,
        typeHandlerVersion: "{handler-version}",
      },
    },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
      vmssExtensionName,
    )
    .patch(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetExtensionsUpdateMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to The operation to update an extension.
 *
 * @summary The operation to update an extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtensions_Update_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionsUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaaaa";
  const vmssExtensionName = "aa";
  const options: VirtualMachineScaleSetExtensionsUpdateParameters = {
    body: {},
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
      vmssExtensionName,
    )
    .patch(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetExtensionsUpdateMinimumSetGen().catch(console.error);
