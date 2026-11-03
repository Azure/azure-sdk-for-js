// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of ElasticSans in a subscription
 *
 * @summary gets a list of ElasticSans in a subscription
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_ListBySubscription_MinimumSet_Gen.json
 */
async function elasticSansListBySubscriptionMinimumSetGen(): Promise<void> {
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
async function elasticSansV1ListBySubscriptionMaximumSetGen(): Promise<void> {
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
async function elasticSansV2ListBySubscriptionMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticSans.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await elasticSansListBySubscriptionMinimumSetGen();
  await elasticSansV1ListBySubscriptionMaximumSetGen();
  await elasticSansV2ListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
