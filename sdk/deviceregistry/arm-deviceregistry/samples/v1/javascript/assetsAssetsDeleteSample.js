// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Asset
 *
 * @summary delete a Asset
 * x-ms-original-file: 2024-11-01/Delete_Asset.json
 */
async function deleteAsset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.assets.delete("myResourceGroup", "my-asset");
}

async function main() {
  await deleteAsset();
}

main().catch(console.error);
