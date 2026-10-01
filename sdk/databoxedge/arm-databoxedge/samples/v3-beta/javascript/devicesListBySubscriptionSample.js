// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the Data Box Edge/Data Box Gateway devices in a subscription.
 *
 * @summary gets all the Data Box Edge/Data Box Gateway devices in a subscription.
 * x-ms-original-file: 2023-12-01/DataBoxEdgeDeviceGetBySubscription.json
 */
async function dataBoxEdgeDeviceGetBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.devices.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await dataBoxEdgeDeviceGetBySubscription();
}

main().catch(console.error);
