// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing Front Door with the specified parameters.
 *
 * @summary deletes an existing Front Door with the specified parameters.
 * x-ms-original-file: 2025-10-01/FrontdoorDelete.json
 */
async function deleteFrontDoor() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  await client.frontDoors.delete("rg1", "frontDoor1");
}

async function main() {
  await deleteFrontDoor();
}

main().catch(console.error);
