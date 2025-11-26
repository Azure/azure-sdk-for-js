// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Fetch the User API Key from the internal database, if it was generated and stored during the creation of the Elasticsearch Organization.
 *
 * @summary Fetch the User API Key from the internal database, if it was generated and stored during the creation of the Elasticsearch Organization.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/Organizations_GetApiKey.json
 */
async function organizationsGetApiKey(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.organizations.getApiKey();
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsGetApiKey();
}

main().catch(console.error);
