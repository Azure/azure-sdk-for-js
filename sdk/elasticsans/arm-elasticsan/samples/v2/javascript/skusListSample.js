// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the available Skus in the region and information related to them
 *
 * @summary list all the available Skus in the region and information related to them
 * x-ms-original-file: 2025-09-01/Skus_List_MaximumSet_Gen.json
 */
async function skusListMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.skus.list({ filter: "obwwdrkq" })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list all the available Skus in the region and information related to them
 *
 * @summary list all the available Skus in the region and information related to them
 * x-ms-original-file: 2025-09-01/Skus_List_MinimumSet_Gen.json
 */
async function skusListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.skus.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await skusListMaximumSetGen();
  await skusListMinimumSetGen();
}

main().catch(console.error);
