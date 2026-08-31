// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Front Door with the specified Front Door name under the specified subscription and resource group.
 *
 * @summary gets a Front Door with the specified Front Door name under the specified subscription and resource group.
 * x-ms-original-file: 2025-11-01/FrontdoorGet.json
 */
async function getFrontDoor() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.frontDoors.get("rg1", "frontDoor1");
  console.log(result);
}

async function main() {
  await getFrontDoor();
}

main().catch(console.error);
