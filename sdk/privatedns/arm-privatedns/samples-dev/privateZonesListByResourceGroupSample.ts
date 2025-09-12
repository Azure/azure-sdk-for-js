// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the Private DNS zones within a resource group.
 *
 * @summary Lists the Private DNS zones within a resource group.
 * x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/PrivateZoneListInResourceGroup.json
 */

import { PrivateDnsManagementClient } from "@azure/arm-privatedns";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getPrivateDnsZoneByResourceGroup(): Promise<void> {
  const subscriptionId = process.env["PRIVATEDNS_SUBSCRIPTION_ID"] || "subscriptionId";
  const resourceGroupName = process.env["PRIVATEDNS_RESOURCE_GROUP"] || "resourceGroup1";
  const credential = new DefaultAzureCredential();
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateZones.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getPrivateDnsZoneByResourceGroup();
}

main().catch(console.error);
