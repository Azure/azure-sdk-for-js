// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineScaleSetExtensionsCreateOrUpdateParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to The operation to create or update an extension.
 *
 * @summary The operation to create or update an extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtensions_CreateOrUpdate_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionsCreateOrUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaa";
  const vmssExtensionName = "aaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetExtensionsCreateOrUpdateParameters = {
    body: {
      name: "{extension-name}",
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
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetExtensionsCreateOrUpdateMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update an extension.
 *
 * @summary The operation to create or update an extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtensions_CreateOrUpdate_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionsCreateOrUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaa";
  const vmssExtensionName = "aaaaaaaaaaa";
  const options: VirtualMachineScaleSetExtensionsCreateOrUpdateParameters = {
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
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetExtensionsCreateOrUpdateMinimumSetGen().catch(console.error);
