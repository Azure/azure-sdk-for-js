// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to >;
 *   /**
 * Retrieve mapping details between the Elastic Organization and Azure Subscription for the logged-in user.
 *
 * @summary >;
 *   /**
 * Retrieve mapping details between the Elastic Organization and Azure Subscription for the logged-in user.
 * x-ms-original-file: 2025-06-01/Organizations_GetElasticToAzureSubscriptionMapping.json
 */
async function organizationsGetElasticToAzureSubscriptionMapping(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.organizations.getElasticToAzureSubscriptionMapping();
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsGetElasticToAzureSubscriptionMapping();
}

main().catch(console.error);
