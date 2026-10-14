// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list DeviceGroup resources by Product. '.default' and '.unassigned' are system defined values and cannot be used for product name.
 *
 * @summary list DeviceGroup resources by Product. '.default' and '.unassigned' are system defined values and cannot be used for product name.
 * x-ms-original-file: 2024-04-01/GetDeviceGroups.json
 */
async function deviceGroupsListByProduct() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deviceGroups.listByProduct(
    "MyResourceGroup1",
    "MyCatalog1",
    "MyProduct1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await deviceGroupsListByProduct();
}

main().catch(console.error);
