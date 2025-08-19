// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a list of all Search services in the given subscription.
 *
 * @summary Gets a list of all Search services in the given subscription.
 * x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2025-05-01/examples/SearchListServicesBySubscription.json
 */

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function searchListServicesBySubscription(): Promise<void> {
  const subscriptionId = process.env["SEARCH_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new SearchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.services.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await searchListServicesBySubscription();
}

main().catch(console.error);
