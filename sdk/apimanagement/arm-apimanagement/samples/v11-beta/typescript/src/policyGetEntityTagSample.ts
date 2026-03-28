// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the Global policy definition in the Api Management service.
 *
 * @summary gets the entity state (Etag) version of the Global policy definition in the Api Management service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadPolicy.json
 */
async function apiManagementHeadPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.policy.getEntityTag("rg1", "apimService1", "policy");
}

async function main(): Promise<void> {
  await apiManagementHeadPolicy();
}

main().catch(console.error);
