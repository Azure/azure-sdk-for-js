// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get Elastic Organization To Azure Subscription Mapping details for the logged-in user.
 *
 * @summary Get Elastic Organization To Azure Subscription Mapping details for the logged-in user.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Organizations_GetElasticToAzureSubscriptionMapping.json
 */

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function organizationsGetElasticToAzureSubscriptionMapping(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.organizations.getElasticToAzureSubscriptionMapping();
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsGetElasticToAzureSubscriptionMapping();
}

main().catch(console.error);
