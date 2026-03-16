// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the frontend endpoints within a Front Door.
 *
 * @summary lists all of the frontend endpoints within a Front Door.
 * x-ms-original-file: 2025-10-01/FrontdoorFrontendEndpointList.json
 */
async function listFrontendEndpointsInAFrontDoor() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.frontendEndpoints.listByFrontDoor("rg1", "frontDoor1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listFrontendEndpointsInAFrontDoor();
}

main().catch(console.error);
