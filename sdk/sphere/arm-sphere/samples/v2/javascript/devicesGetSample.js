// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Device. Use '.unassigned' or '.default' for the device group and product names when a device does not belong to a device group and product.
 *
 * @summary get a Device. Use '.unassigned' or '.default' for the device group and product names when a device does not belong to a device group and product.
 * x-ms-original-file: 2024-04-01/GetDevice.json
 */
async function devicesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.devices.get(
    "MyResourceGroup1",
    "MyCatalog1",
    "MyProduct1",
    "myDeviceGroup1",
    "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  );
  console.log(result);
}

async function main() {
  await devicesGet();
}

main().catch(console.error);
