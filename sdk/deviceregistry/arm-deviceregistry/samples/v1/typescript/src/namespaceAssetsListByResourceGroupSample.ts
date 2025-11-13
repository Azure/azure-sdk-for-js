// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list NamespaceAsset resources by Namespace
 *
 * @summary list NamespaceAsset resources by Namespace
 * x-ms-original-file: 2025-10-01/List_NamespaceAssets_ByResourceGroup.json
 */
async function listNamespaceAssetsByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaceAssets.listByResourceGroup(
    "myResourceGroup",
    "adr-namespace-gbk0925-n01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNamespaceAssetsByResourceGroup();
}

main().catch(console.error);
