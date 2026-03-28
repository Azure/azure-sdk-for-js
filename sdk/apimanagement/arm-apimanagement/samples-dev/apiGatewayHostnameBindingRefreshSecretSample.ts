// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refresh the secret for an API Management gateway hostname binding.
 *
 * @summary refresh the secret for an API Management gateway hostname binding.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementRefreshGatewayHostnameBindingSecret.json
 */
async function apiManagementRefreshGatewayHostnameBindingSecret(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiGatewayHostnameBinding.refreshSecret("rg1", "standard-gw-01", "gcc-01");
}

async function main(): Promise<void> {
  await apiManagementRefreshGatewayHostnameBindingSecret();
}

main().catch(console.error);
