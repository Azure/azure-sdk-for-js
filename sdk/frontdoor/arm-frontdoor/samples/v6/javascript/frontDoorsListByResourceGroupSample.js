// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the Front Doors within a resource group under a subscription.
 *
 * @summary lists all of the Front Doors within a resource group under a subscription.
 * x-ms-original-file: 2025-10-01/FrontdoorList.json
 */
async function listFrontDoorsInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.frontDoors.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listFrontDoorsInAResourceGroup();
}

main().catch(console.error);
