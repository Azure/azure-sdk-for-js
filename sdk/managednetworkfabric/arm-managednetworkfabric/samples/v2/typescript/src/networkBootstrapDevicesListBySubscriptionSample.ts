// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the Network Bootstrap Device resources in a given subscription.
 *
 * @summary list all the Network Bootstrap Device resources in a given subscription.
 * x-ms-original-file: 2025-07-15/NetworkBootstrapDevices_ListBySubscription.json
 */
async function networkBootstrapDevicesListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkBootstrapDevices.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await networkBootstrapDevicesListBySubscription();
}

main().catch(console.error);
