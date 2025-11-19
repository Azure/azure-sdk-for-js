// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SkusListOptionalParams} from "@azure/arm-elasticsan";
import {
  ElasticSanManagement,
} from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all the available Skus in the region and information related to them
 *
 * @summary List all the available Skus in the region and information related to them
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/ElasticSan/stable/2025-09-01/examples/Skus_List_MaximumSet_Gen.json
 */
async function skusListMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const filter = "obwwdrkq";
  const options: SkusListOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.skus.list(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List all the available Skus in the region and information related to them
 *
 * @summary List all the available Skus in the region and information related to them
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/ElasticSan/stable/2025-09-01/examples/Skus_List_MinimumSet_Gen.json
 */
async function skusListMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.skus.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await skusListMaximumSetGen();
  await skusListMinimumSetGen();
}

main().catch(console.error);
