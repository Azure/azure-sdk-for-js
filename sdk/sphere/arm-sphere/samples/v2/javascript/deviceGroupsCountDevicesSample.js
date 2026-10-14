// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to counts devices in device group. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 *
 * @summary counts devices in device group. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 * x-ms-original-file: 2024-04-01/PostCountDevicesDeviceGroup.json
 */
async function deviceGroupsCountDevices() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.deviceGroups.countDevices(
    "MyResourceGroup1",
    "MyCatalog1",
    "MyProduct1",
    "MyDeviceGroup1",
  );
  console.log(result);
}

async function main() {
  await deviceGroupsCountDevices();
}

main().catch(console.error);
