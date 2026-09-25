// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list NamespaceAsset resources by Namespace
 *
 * @summary list NamespaceAsset resources by Namespace
 * x-ms-original-file: 2026-11-01/List_NamespaceAssets_ByNamespace.json
 */
async function listNamespaceAssetsByNamespace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaceAssets.listByNamespace(
    "myResourceGroup",
    "adr-namespace-gbk0925-n01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNamespaceAssetsByNamespace();
}

main().catch(console.error);
