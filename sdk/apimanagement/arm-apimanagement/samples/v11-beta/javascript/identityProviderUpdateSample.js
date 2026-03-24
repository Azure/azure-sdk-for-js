// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing IdentityProvider configuration.
 *
 * @summary updates an existing IdentityProvider configuration.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateIdentityProvider.json
 */
async function apiManagementUpdateIdentityProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.identityProvider.update("rg1", "apimService1", "facebook", "*", {
    clientId: "updatedfacebookid",
    clientSecret: "updatedfacebooksecret",
  });
  console.log(result);
}

async function main() {
  await apiManagementUpdateIdentityProvider();
}

main().catch(console.error);
