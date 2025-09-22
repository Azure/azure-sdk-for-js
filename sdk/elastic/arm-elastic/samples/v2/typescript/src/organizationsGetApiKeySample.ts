// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetch the User API Key from the internal database, if it was generated and stored during the creation of the Elasticsearch Organization.
 *
 * @summary fetch the User API Key from the internal database, if it was generated and stored during the creation of the Elasticsearch Organization.
 * x-ms-original-file: 2025-06-01/Organizations_GetApiKey.json
 */
async function organizationsGetApiKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.organizations.getApiKey();
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsGetApiKey();
}

main().catch(console.error);
