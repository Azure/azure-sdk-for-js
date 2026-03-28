// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the client secret details of the Identity Provider.
 *
 * @summary gets the client secret details of the Identity Provider.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementIdentityProviderListSecrets.json
 */
async function apiManagementIdentityProviderListSecrets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.identityProvider.listSecrets("rg1", "apimService1", "aadB2C");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementIdentityProviderListSecrets();
}

main().catch(console.error);
