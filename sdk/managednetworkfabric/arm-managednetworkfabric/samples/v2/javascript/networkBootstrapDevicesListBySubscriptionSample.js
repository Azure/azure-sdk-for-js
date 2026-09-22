// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the Network Bootstrap Device resources in a given subscription.
 *
 * @summary list all the Network Bootstrap Device resources in a given subscription.
 * x-ms-original-file: 2025-07-15/NetworkBootstrapDevices_ListBySubscription.json
 */
async function networkBootstrapDevicesListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkBootstrapDevices.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await networkBootstrapDevicesListBySubscription();
}

main().catch(console.error);
