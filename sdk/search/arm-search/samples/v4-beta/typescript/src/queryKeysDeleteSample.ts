// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified query key. Unlike admin keys, query keys are not regenerated. The process for regenerating a query key is to delete and then recreate it.
 * Returns 200 (OK) on successful deletion, 204 (No Content) if the service exists but the query keys not found, or 404 (Not Found) if the service is not found.
 * NOTE: The behavior of returning 404 is inconsistent with ARM guidelines. Clients should expect a 204 response in future versions and avoid new dependencies on the 404 response.
 *
 * @summary deletes the specified query key. Unlike admin keys, query keys are not regenerated. The process for regenerating a query key is to delete and then recreate it.
 * Returns 200 (OK) on successful deletion, 204 (No Content) if the service exists but the query keys not found, or 404 (Not Found) if the service is not found.
 * NOTE: The behavior of returning 404 is inconsistent with ARM guidelines. Clients should expect a 204 response in future versions and avoid new dependencies on the 404 response.
 * x-ms-original-file: 2026-03-01-preview/SearchDeleteQueryKey.json
 */
async function searchDeleteQueryKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  await client.queryKeys.delete("rg1", "mysearchservice", "<a query API key>");
}

async function main(): Promise<void> {
  await searchDeleteQueryKey();
}

main().catch(console.error);
