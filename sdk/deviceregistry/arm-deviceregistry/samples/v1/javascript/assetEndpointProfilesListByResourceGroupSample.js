// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AssetEndpointProfile resources by resource group
 *
 * @summary list AssetEndpointProfile resources by resource group
 * x-ms-original-file: 2025-10-01/List_AssetEndpointProfiles_ByResourceGroup.json
 */
async function listAssetEndpointProfilesByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.assetEndpointProfiles.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAssetEndpointProfilesByResourceGroup();
}

main().catch(console.error);
