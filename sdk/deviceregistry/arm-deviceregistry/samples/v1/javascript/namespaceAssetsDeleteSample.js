// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a NamespaceAsset
 *
 * @summary delete a NamespaceAsset
 * x-ms-original-file: 2025-10-01/Delete_NamespaceAsset.json
 */
async function deleteNamespaceAsset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.namespaceAssets.delete(
    "myResourceGroup",
    "adr-namespace-gbk0925-n01",
    "adr-asset-gbk0925-n01",
  );
}

async function main() {
  await deleteNamespaceAsset();
}

main().catch(console.error);
