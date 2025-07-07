// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-privatedns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the Private DNS zones within a resource group.
 *
 * @summary lists the Private DNS zones within a resource group.
 * x-ms-original-file: 2024-06-01/PrivateZoneListInResourceGroup.json
 */
async function getPrivateDNSZoneByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateZones.listByResourceGroup("resourceGroup1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getPrivateDNSZoneByResourceGroup();
}

main().catch(console.error);
