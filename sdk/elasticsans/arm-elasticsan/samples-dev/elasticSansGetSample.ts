// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ElasticSan.
 *
 * @summary get a ElasticSan.
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_V1_Get_MaximumSet_Gen.json
 */
async function elasticSansV1GetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.get("resourcegroupname", "elasticsanname");
  console.log(result);
}

/**
 * This sample demonstrates how to get a ElasticSan.
 *
 * @summary get a ElasticSan.
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_V1_Get_MinimumSet_Gen.json
 */
async function elasticSansV1GetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.get("resourcegroupname", "elasticsanname");
  console.log(result);
}

/**
 * This sample demonstrates how to get a ElasticSan.
 *
 * @summary get a ElasticSan.
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_V2_Get_MaximumSet_Gen.json
 */
async function elasticSansV2GetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.get("resourcegroupname", "elasticsanname");
  console.log(result);
}

/**
 * This sample demonstrates how to get a ElasticSan.
 *
 * @summary get a ElasticSan.
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_V2_Get_MinimumSet_Gen.json
 */
async function elasticSansV2GetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.elasticSans.get("resourcegroupname", "elasticsanname");
  console.log(result);
}

async function main(): Promise<void> {
  await elasticSansV1GetMaximumSetGen();
  await elasticSansV1GetMinimumSetGen();
  await elasticSansV2GetMaximumSetGen();
  await elasticSansV2GetMinimumSetGen();
}

main().catch(console.error);
