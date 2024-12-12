// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AssetEndpointProfile resources by subscription ID
 *
 * @summary list AssetEndpointProfile resources by subscription ID
 * x-ms-original-file: 2024-09-01-preview/List_AssetEndpointProfiles_Subscription.json
 */
async function listAssetEndpointProfilesSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.assetEndpointProfiles.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  listAssetEndpointProfilesSubscription();
}

main().catch(console.error);
