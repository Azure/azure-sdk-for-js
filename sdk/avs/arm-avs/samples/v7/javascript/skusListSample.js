// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a list of SKUs.
 *
 * @summary a list of SKUs.
 * x-ms-original-file: 2024-09-01/Skus_List.json
 */
async function skusList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.skus.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await skusList();
}

main().catch(console.error);
