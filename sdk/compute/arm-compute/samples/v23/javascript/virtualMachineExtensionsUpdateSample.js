// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The operation to update the extension.
 *
 * @summary The operation to update the extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineExamples/VirtualMachineExtension_Update.json
 */
async function updateVMExtension() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const vmName = "myVM";
  const vmExtensionName = "myVMExtension";
  const extensionParameters = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineExtensions.beginUpdateAndWait(
    resourceGroupName,
    vmName,
    vmExtensionName,
    extensionParameters,
  );
  console.log(result);
}

async function main() {
  await updateVMExtension();
}

main().catch(console.error);
