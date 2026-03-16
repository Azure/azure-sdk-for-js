// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the Front Doors within an Azure subscription.
 *
 * @summary lists all of the Front Doors within an Azure subscription.
 * x-ms-original-file: 2025-10-01/FrontdoorListAll.json
 */
async function listAllFrontDoors() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.frontDoors.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllFrontDoors();
}

main().catch(console.error);
