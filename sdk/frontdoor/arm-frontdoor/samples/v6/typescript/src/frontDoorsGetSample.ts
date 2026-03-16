// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Front Door with the specified Front Door name under the specified subscription and resource group.
 *
 * @summary gets a Front Door with the specified Front Door name under the specified subscription and resource group.
 * x-ms-original-file: 2025-10-01/FrontdoorGet.json
 */
async function getFrontDoor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.frontDoors.get("rg1", "frontDoor1");
  console.log(result);
}

async function main(): Promise<void> {
  await getFrontDoor();
}

main().catch(console.error);
