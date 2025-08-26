// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Fetch User API Key from internal database, if it was generated and stored while creating the Elasticsearch Organization.
 *
 * @summary Fetch User API Key from internal database, if it was generated and stored while creating the Elasticsearch Organization.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Organizations_GetApiKey.json
 */

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function organizationsGetApiKey(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.organizations.getApiKey();
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsGetApiKey();
}

main().catch(console.error);
