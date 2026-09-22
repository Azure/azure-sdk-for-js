// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a specific order by name.
 *
 * @summary gets a specific order by name.
 * x-ms-original-file: 2023-12-01/OrderGet.json
 */
async function orderGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.orders.get("testedgedevice", "GroupForEdgeAutomation");
  console.log(result);
}

async function main() {
  await orderGet();
}

main().catch(console.error);
