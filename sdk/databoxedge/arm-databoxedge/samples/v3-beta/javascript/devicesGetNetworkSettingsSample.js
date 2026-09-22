// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the network settings of the specified Data Box Edge/Data Box Gateway device.
 *
 * @summary gets the network settings of the specified Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/NetworkSettingsGet.json
 */
async function networkSettingsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.devices.getNetworkSettings(
    "testedgedevice",
    "GroupForEdgeAutomation",
  );
  console.log(result);
}

async function main() {
  await networkSettingsGet();
}

main().catch(console.error);
