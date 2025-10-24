// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a NamespaceAsset
 *
 * @summary delete a NamespaceAsset
 * x-ms-original-file: 2025-10-01/Delete_NamespaceAsset.json
 */
async function deleteNamespaceAsset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.namespaceAssets.delete(
    "myResourceGroup",
    "adr-namespace-gbk0925-n01",
    "adr-asset-gbk0925-n01",
  );
}

async function main(): Promise<void> {
  await deleteNamespaceAsset();
}

main().catch(console.error);
