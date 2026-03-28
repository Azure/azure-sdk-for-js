// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to refreshes the Key Vault reference secret for the specified authorization provider.
 *
 * @summary refreshes the Key Vault reference secret for the specified authorization provider.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementRefreshAuthorizationProviderSecret.json
 */
async function apiManagementAuthorizationProviderRefreshSecret() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationProvider.refreshSecret(
    "rg1",
    "apimService1",
    "aadwithkeyvault",
  );
  console.log(result);
}

async function main() {
  await apiManagementAuthorizationProviderRefreshSecret();
}

main().catch(console.error);
