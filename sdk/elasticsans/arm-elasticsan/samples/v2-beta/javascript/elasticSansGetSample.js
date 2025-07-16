// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanClient } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ElasticSan.
 *
 * @summary get a ElasticSan.
 * x-ms-original-file: 2024-07-01-preview/ElasticSans_Get_MaximumSet_Gen.json
 */
async function elasticSansGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanClient(credential, subscriptionId);
  const result = await client.elasticSans.get("resourcegroupname", "elasticsanname");
  console.log(result);
}

/**
 * This sample demonstrates how to get a ElasticSan.
 *
 * @summary get a ElasticSan.
 * x-ms-original-file: 2024-07-01-preview/ElasticSans_Get_MinimumSet_Gen.json
 */
async function elasticSansGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanClient(credential, subscriptionId);
  const result = await client.elasticSans.get("resourcegroupname", "elasticsanname");
  console.log(result);
}

async function main() {
  await elasticSansGetMaximumSetGen();
  await elasticSansGetMinimumSetGen();
}

main().catch(console.error);
