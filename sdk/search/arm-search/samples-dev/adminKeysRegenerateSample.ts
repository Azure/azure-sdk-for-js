// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Regenerates either the primary or secondary admin API key. You can only regenerate one key at a time.
 *
 * @summary Regenerates either the primary or secondary admin API key. You can only regenerate one key at a time.
 * x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2025-05-01/examples/SearchRegenerateAdminKey.json
 */

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function searchRegenerateAdminKey(): Promise<void> {
  const subscriptionId = process.env["SEARCH_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["SEARCH_RESOURCE_GROUP"] || "rg1";
  const searchServiceName = "mysearchservice";
  const keyKind = "primary";
  const credential = new DefaultAzureCredential();
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.adminKeys.regenerate(
    resourceGroupName,
    searchServiceName,
    keyKind,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await searchRegenerateAdminKey();
}

main().catch(console.error);
