// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieve mapping details between the Elastic Organization and Azure Subscription for the logged-in user.
 *
 * @summary Retrieve mapping details between the Elastic Organization and Azure Subscription for the logged-in user.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/Organizations_GetElasticToAzureSubscriptionMapping.json
 */
async function organizationsGetElasticToAzureSubscriptionMapping(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result =
    await client.organizations.getElasticToAzureSubscriptionMapping();
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsGetElasticToAzureSubscriptionMapping();
}

main().catch(console.error);
