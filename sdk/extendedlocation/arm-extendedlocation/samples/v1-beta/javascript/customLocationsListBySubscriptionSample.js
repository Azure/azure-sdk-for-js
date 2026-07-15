// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CustomLocationsManagementClient } = require("@azure/arm-extendedlocation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of Custom Locations in the specified subscription. The operation returns properties of each Custom Location
 *
 * @summary gets a list of Custom Locations in the specified subscription. The operation returns properties of each Custom Location
 * x-ms-original-file: 2021-08-31-preview/CustomLocationsListBySubscription.json
 */
async function listCustomLocationsBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new CustomLocationsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.customLocations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCustomLocationsBySubscription();
}

main().catch(console.error);
