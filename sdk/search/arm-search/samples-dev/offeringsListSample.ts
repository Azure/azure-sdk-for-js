// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the features and SKUs offered by the Azure AI Search service in each region. Note: This API returns a non-ARM resource collection and is not RPC-compliant. It will be replaced with an action-style API in the next preview as a breaking change. Customers should avoid taking new dependencies on the current shape.
 *
 * @summary lists all of the features and SKUs offered by the Azure AI Search service in each region. Note: This API returns a non-ARM resource collection and is not RPC-compliant. It will be replaced with an action-style API in the next preview as a breaking change. Customers should avoid taking new dependencies on the current shape.
 * x-ms-original-file: 2026-03-01-preview/SearchListOfferings.json
 */
async function searchListOfferings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SearchManagementClient(credential);
  const result = await client.offerings.list();
  console.log(result);
}

async function main(): Promise<void> {
  await searchListOfferings();
}

main().catch(console.error);
