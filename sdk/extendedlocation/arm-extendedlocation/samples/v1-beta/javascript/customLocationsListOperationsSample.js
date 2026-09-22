// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CustomLocationsManagementClient } = require("@azure/arm-extendedlocation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all available Custom Locations operations.
 *
 * @summary lists all available Custom Locations operations.
 * x-ms-original-file: 2021-08-31-preview/CustomLocationsListOperations.json
 */
async function listCustomLocationsOperations() {
  const credential = new DefaultAzureCredential();
  const client = new CustomLocationsManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.customLocations.listOperations()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCustomLocationsOperations();
}

main().catch(console.error);
