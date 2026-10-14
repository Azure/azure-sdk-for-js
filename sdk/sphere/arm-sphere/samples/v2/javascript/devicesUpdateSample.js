// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Device. Use '.unassigned' or '.default' for the device group and product names to move a device to the catalog level.
 *
 * @summary update a Device. Use '.unassigned' or '.default' for the device group and product names to move a device to the catalog level.
 * x-ms-original-file: 2024-04-01/PatchDevice.json
 */
async function devicesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.devices.update(
    "MyResourceGroup1",
    "MyCatalog1",
    "MyProduct1",
    "MyDeviceGroup1",
    "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    {},
  );
  console.log(result);
}

async function main() {
  await devicesUpdate();
}

main().catch(console.error);
