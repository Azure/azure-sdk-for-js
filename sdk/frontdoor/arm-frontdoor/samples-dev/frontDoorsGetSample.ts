// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a Front Door with the specified Front Door name under the specified subscription and resource group.
 *
 * @summary Gets a Front Door with the specified Front Door name under the specified subscription and resource group.
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2021-06-01/examples/FrontdoorGet.json
 */

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getFrontDoor(): Promise<void> {
  const subscriptionId = process.env["FRONTDOOR_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["FRONTDOOR_RESOURCE_GROUP"] || "rg1";
  const frontDoorName = "frontDoor1";
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.frontDoors.get(resourceGroupName, frontDoorName);
  console.log(result);
}

async function main(): Promise<void> {
  await getFrontDoor();
}

main().catch(console.error);
