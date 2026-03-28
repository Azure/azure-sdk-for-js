// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the custom domain ownership identifier for an API Management service.
 *
 * @summary get the custom domain ownership identifier for an API Management service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementServiceGetDomainOwnershipIdentifier.json
 */
async function apiManagementServiceGetDomainOwnershipIdentifier(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.getDomainOwnershipIdentifier();
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementServiceGetDomainOwnershipIdentifier();
}

main().catch(console.error);
