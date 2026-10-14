// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates default device groups for the product. '.default' and '.unassigned' are system defined values and cannot be used for product name.
 *
 * @summary generates default device groups for the product. '.default' and '.unassigned' are system defined values and cannot be used for product name.
 * x-ms-original-file: 2024-04-01/PostGenerateDefaultDeviceGroups.json
 */
async function productsGenerateDefaultDeviceGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.products.generateDefaultDeviceGroups(
    "MyResourceGroup1",
    "MyCatalog1",
    "MyProduct1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await productsGenerateDefaultDeviceGroups();
}

main().catch(console.error);
