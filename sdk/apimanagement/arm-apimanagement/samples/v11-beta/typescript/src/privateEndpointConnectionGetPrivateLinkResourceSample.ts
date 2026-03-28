// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private link resources
 *
 * @summary gets the private link resources
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetPrivateLinkGroupResource.json
 */
async function apiManagementGetPrivateLinkGroupResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnection.getPrivateLinkResource(
    "rg1",
    "apimService1",
    "privateLinkSubResourceName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetPrivateLinkGroupResource();
}

main().catch(console.error);
