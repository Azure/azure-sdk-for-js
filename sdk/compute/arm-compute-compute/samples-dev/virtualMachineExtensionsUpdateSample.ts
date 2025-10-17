// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update the extension.
 *
 * @summary the operation to update the extension.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachineExtension_Update.json
 */
async function updateVMExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineExtensions.update("myResourceGroup", "myVM", "myVMExtension", {
    properties: {
      autoUpgradeMinorVersion: true,
      publisher: "extPublisher",
      type: "extType",
      typeHandlerVersion: "1.2",
      suppressFailures: true,
      settings: { UserName: "xyz@microsoft.com" },
      protectedSettingsFromKeyVault: {
        sourceVault: {
          id: "/subscriptions/a53f7094-a16c-47af-abe4-b05c05d0d79a/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/vaults/kvName",
        },
        secretUrl:
          "https://kvName.vault.azure.net/secrets/secretName/79b88b3a6f5440ffb2e73e44a0db712e",
      },
    },
  });
}

async function main(): Promise<void> {
  await updateVMExtension();
}

main().catch(console.error);
