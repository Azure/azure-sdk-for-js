// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a list of available versions for a region.
 *
 * @summary Get a list of available versions for a region.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/ElasticVersions_List.json
 */

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function elasticVersionsList(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const region = "myregion";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticVersions.list(region)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await elasticVersionsList();
}

main().catch(console.error);
