// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the addon on the device.
 *
 * @summary deletes the addon on the device.
 * x-ms-original-file: 2023-12-01/DeleteAddons.json
 */
async function deleteAddOns() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.addons.delete(
    "testedgedevice",
    "KubernetesRole",
    "arcName",
    "GroupForEdgeAutomation",
  );
}

async function main() {
  await deleteAddOns();
}

main().catch(console.error);
