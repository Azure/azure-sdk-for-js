// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the available Skus and information related to them.
 *
 * @summary list all the available Skus and information related to them.
 * x-ms-original-file: 2023-12-01/AvailableSkusList.json
 */
async function availableSkus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availableSkus.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await availableSkus();
}

main().catch(console.error);
