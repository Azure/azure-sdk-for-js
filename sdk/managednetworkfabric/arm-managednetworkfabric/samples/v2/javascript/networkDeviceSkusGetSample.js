// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Network Device SKU details.
 *
 * @summary get a Network Device SKU details.
 * x-ms-original-file: 2025-07-15/NetworkDeviceSkus_Get.json
 */
async function networkDeviceSkusGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkDeviceSkus.get("example-deviceSku");
  console.log(result);
}

async function main() {
  await networkDeviceSkusGetMaximumSetGen();
}

main().catch(console.error);
