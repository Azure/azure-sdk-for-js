// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetches the features and SKUs offered by the Azure AI Search service in each region, along with the recommended default region for creating new services.
 *
 * @summary fetches the features and SKUs offered by the Azure AI Search service in each region, along with the recommended default region for creating new services.
 * x-ms-original-file: 2026-09-01-preview/SearchFetchOfferings.json
 */
async function searchFetchOfferings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SearchManagementClient(credential);
  const result = await client.offerings.fetch();
  console.log(result);
}

async function main(): Promise<void> {
  await searchFetchOfferings();
}

main().catch(console.error);
