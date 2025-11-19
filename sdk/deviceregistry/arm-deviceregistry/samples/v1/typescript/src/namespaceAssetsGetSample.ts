// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a NamespaceAsset
 *
 * @summary get a NamespaceAsset
 * x-ms-original-file: 2025-10-01/Get_NamespaceAsset.json
 */
async function getNamespaceAsset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaceAssets.get(
    "myResourceGroup",
    "my-namespace-1",
    "my-asset-1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getNamespaceAsset();
}

main().catch(console.error);
