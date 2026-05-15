// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all network interfaces in a cloud service.
 *
 * @summary gets all network interfaces in a cloud service.
 * x-ms-original-file: 2025-05-01/CloudServiceNetworkInterfaceList.json
 */
async function listCloudServiceNetworkInterfaces(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkInterfaces.listCloudServiceNetworkInterfaces(
    "rg1",
    "cs1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listCloudServiceNetworkInterfaces();
}

main().catch(console.error);
