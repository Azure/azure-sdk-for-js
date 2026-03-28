// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the etag of an API release.
 *
 * @summary returns the etag of an API release.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadApiRelease.json
 */
async function apiManagementHeadApiRelease(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiRelease.getEntityTag("rg1", "apimService1", "a1", "5a7cb545298324c53224a799");
}

async function main(): Promise<void> {
  await apiManagementHeadApiRelease();
}

main().catch(console.error);
