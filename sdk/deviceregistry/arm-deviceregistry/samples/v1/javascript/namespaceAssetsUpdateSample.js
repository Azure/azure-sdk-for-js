// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a NamespaceAsset
 *
 * @summary update a NamespaceAsset
 * x-ms-original-file: 2025-10-01/Update_NamespaceAsset.json
 */
async function updateNamespaceAssets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaceAssets.update(
    "myResourceGroup",
    "my-namespace-1",
    "my-asset-1",
    {
      properties: {
        enabled: true,
        displayName: "AssetDisplayNameUpdate",
        description: "This is a sample updated Asset",
      },
    },
  );
  console.log(result);
}

async function main() {
  await updateNamespaceAssets();
}

main().catch(console.error);
