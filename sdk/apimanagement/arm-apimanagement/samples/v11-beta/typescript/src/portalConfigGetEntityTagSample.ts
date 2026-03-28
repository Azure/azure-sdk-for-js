// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the developer portal configuration.
 *
 * @summary gets the entity state (Etag) version of the developer portal configuration.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadPortalConfig.json
 */
async function apiManagementHeadPortalConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.portalConfig.getEntityTag("rg1", "apimService1", "default");
}

async function main(): Promise<void> {
  await apiManagementHeadPortalConfig();
}

main().catch(console.error);
