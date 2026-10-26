// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of ElasticSan in a resource group.
 *
 * @summary gets a list of ElasticSan in a resource group.
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_ListByResourceGroup_MinimumSet_Gen.json
 */
async function elasticSansListByResourceGroupMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticSans.listByResourceGroup("resourcegroupname")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of ElasticSan in a resource group.
 *
 * @summary gets a list of ElasticSan in a resource group.
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_V1_ListByResourceGroup_MaximumSet_Gen.json
 */
async function elasticSansV1ListByResourceGroupMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticSans.listByResourceGroup("resourcegroupname")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of ElasticSan in a resource group.
 *
 * @summary gets a list of ElasticSan in a resource group.
 * x-ms-original-file: 2026-05-01-preview/ElasticSans_V2_ListByResourceGroup_MaximumSet_Gen.json
 */
async function elasticSansV2ListByResourceGroupMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticSans.listByResourceGroup("resourcegroupname")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await elasticSansListByResourceGroupMinimumSetGen();
  await elasticSansV1ListByResourceGroupMaximumSetGen();
  await elasticSansV2ListByResourceGroupMaximumSetGen();
}

main().catch(console.error);
