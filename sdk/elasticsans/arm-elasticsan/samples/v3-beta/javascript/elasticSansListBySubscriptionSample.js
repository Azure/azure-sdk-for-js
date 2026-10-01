// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of ElasticSans in a subscription
 *
 * @summary gets a list of ElasticSans in a subscription
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_ListBySubscription_MinimumSet_Gen.json
 */
async function elasticSansListBySubscriptionMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
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
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_V1_ListBySubscription_MaximumSet_Gen.json
 */
async function elasticSansV1ListBySubscriptionMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
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
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_V2_ListBySubscription_MaximumSet_Gen.json
 */
async function elasticSansV2ListBySubscriptionMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticSans.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await elasticSansListBySubscriptionMinimumSetGen();
  await elasticSansV1ListBySubscriptionMaximumSetGen();
  await elasticSansV2ListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
