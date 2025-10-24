// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanClient } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of ElasticSans in a subscription
 *
 * @summary gets a list of ElasticSans in a subscription
 * x-ms-original-file: 2024-07-01-preview/ElasticSans_ListBySubscription_MaximumSet_Gen.json
 */
async function elasticSansListBySubscriptionMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticSans.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of ElasticSans in a subscription
 *
 * @summary gets a list of ElasticSans in a subscription
 * x-ms-original-file: 2024-07-01-preview/ElasticSans_ListBySubscription_MinimumSet_Gen.json
 */
async function elasticSansListBySubscriptionMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticSans.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await elasticSansListBySubscriptionMaximumSetGen();
  await elasticSansListBySubscriptionMinimumSetGen();
}

main().catch(console.error);
