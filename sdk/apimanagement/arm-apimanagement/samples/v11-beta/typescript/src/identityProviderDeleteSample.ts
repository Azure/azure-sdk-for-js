// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified identity provider configuration.
 *
 * @summary deletes the specified identity provider configuration.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteIdentityProvider.json
 */
async function apiManagementDeleteIdentityProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.identityProvider.delete("rg1", "apimService1", "aad", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteIdentityProvider();
}

main().catch(console.error);
