// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to update the extension.
 *
 * @summary The operation to update the extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachineExtensions_Update.json
 */

import type { VirtualMachineExtensionsUpdateParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateVMExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const vmExtensionName = "myVMExtension";
  const options: VirtualMachineExtensionsUpdateParameters = {
    body: {
      properties: {
        type: "extType",
        autoUpgradeMinorVersion: true,
        protectedSettingsFromKeyVault: {
          secretUrl:
            "https://kvName.vault.azure.net/secrets/secretName/79b88b3a6f5440ffb2e73e44a0db712e",
          sourceVault: {
            id: "/subscriptions/a53f7094-a16c-47af-abe4-b05c05d0d79a/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/vaults/kvName",
          },
        },
        publisher: "extPublisher",
        settings: { UserName: "xyz@microsoft.com" },
        suppressFailures: true,
        typeHandlerVersion: "1.2",
      },
    },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}",
      subscriptionId,
      resourceGroupName,
      vmName,
      vmExtensionName,
    )
    .patch(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateVMExtension().catch(console.error);
