// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to refresh the secret for an API Management gateway hostname binding.
 *
 * @summary refresh the secret for an API Management gateway hostname binding.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementRefreshGatewayHostnameBindingSecret.json
 */
async function apiManagementRefreshGatewayHostnameBindingSecret() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiGatewayHostnameBinding.refreshSecret("rg1", "standard-gw-01", "gcc-01");
}

async function main() {
  await apiManagementRefreshGatewayHostnameBindingSecret();
}

main().catch(console.error);
