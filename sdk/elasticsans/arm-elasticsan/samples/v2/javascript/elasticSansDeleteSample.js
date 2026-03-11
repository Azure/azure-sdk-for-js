// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Elastic San.
 *
 * @summary delete a Elastic San.
 * x-ms-original-file: 2025-09-01/ElasticSans_Delete_MaximumSet_Gen.json
 */
async function elasticSansDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  await client.elasticSans.delete("resourcegroupname", "elasticsanname");
}

/**
 * This sample demonstrates how to delete a Elastic San.
 *
 * @summary delete a Elastic San.
 * x-ms-original-file: 2025-09-01/ElasticSans_Delete_MinimumSet_Gen.json
 */
async function elasticSansDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  await client.elasticSans.delete("resourcegroupname", "elasticsanname");
}

async function main() {
  await elasticSansDeleteMaximumSetGen();
  await elasticSansDeleteMinimumSetGen();
}

main().catch(console.error);
