// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanClient } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ElasticSan.
 *
 * @summary get a ElasticSan.
 * x-ms-original-file: 2024-07-01-preview/ElasticSans_Get_MaximumSet_Gen.json
 */
async function elasticSansGetMaximumSetGen(): Promise<void> {
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
async function elasticSansGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanClient(credential, subscriptionId);
  const result = await client.elasticSans.get("resourcegroupname", "elasticsanname");
  console.log(result);
}

async function main(): Promise<void> {
  await elasticSansGetMaximumSetGen();
  await elasticSansGetMinimumSetGen();
}

main().catch(console.error);
