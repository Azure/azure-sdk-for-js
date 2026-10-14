// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the device groups for the catalog.
 *
 * @summary list the device groups for the catalog.
 * x-ms-original-file: 2024-04-01/PostListDeviceGroupsCatalog.json
 */
async function catalogsListDeviceGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.catalogs.listDeviceGroups("MyResourceGroup1", "MyCatalog1", {
    deviceGroupName: "MyDeviceGroup1",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await catalogsListDeviceGroups();
}

main().catch(console.error);
