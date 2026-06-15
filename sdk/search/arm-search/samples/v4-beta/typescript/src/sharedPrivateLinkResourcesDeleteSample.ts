// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to initiates the deletion of the shared private link resource from the search service.
 * Returns 202 (Accepted) for asynchronous deletion, 204 (No Content) if the service exists but the shared private link is not found, or 404 (Not Found) if the service is not found.
 * NOTE: The behavior of returning 404 is inconsistent with ARM guidelines. Clients should expect a 204 response in future versions and avoid new dependencies on the 404 response.
 *
 * @summary initiates the deletion of the shared private link resource from the search service.
 * Returns 202 (Accepted) for asynchronous deletion, 204 (No Content) if the service exists but the shared private link is not found, or 404 (Not Found) if the service is not found.
 * NOTE: The behavior of returning 404 is inconsistent with ARM guidelines. Clients should expect a 204 response in future versions and avoid new dependencies on the 404 response.
 * x-ms-original-file: 2026-03-01-preview/DeleteSharedPrivateLinkResource.json
 */
async function sharedPrivateLinkResourceDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  await client.sharedPrivateLinkResources.delete("rg1", "mysearchservice", "testResource");
}

async function main(): Promise<void> {
  await sharedPrivateLinkResourceDelete();
}

main().catch(console.error);
