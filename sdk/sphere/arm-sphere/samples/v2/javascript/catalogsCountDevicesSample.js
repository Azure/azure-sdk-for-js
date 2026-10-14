// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to counts devices in catalog.
 *
 * @summary counts devices in catalog.
 * x-ms-original-file: 2024-04-01/PostCountDevicesCatalog.json
 */
async function catalogsCountDevices() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.catalogs.countDevices("MyResourceGroup1", "MyCatalog1");
  console.log(result);
}

async function main() {
  await catalogsCountDevices();
}

main().catch(console.error);
