// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CustomLocationsManagementClient } = require("@azure/arm-extendedlocation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the Custom Location with the specified Resource Name, Resource Group, and Subscription Id.
 *
 * @summary deletes the Custom Location with the specified Resource Name, Resource Group, and Subscription Id.
 * x-ms-original-file: 2021-08-31-preview/CustomLocationsDelete.json
 */
async function deleteCustomLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new CustomLocationsManagementClient(credential, subscriptionId);
  await client.customLocations.delete("testresourcegroup", "customLocation01");
}

async function main() {
  await deleteCustomLocation();
}

main().catch(console.error);
