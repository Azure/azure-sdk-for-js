// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specific Authorization from the Authorization provider.
 *
 * @summary deletes specific Authorization from the Authorization provider.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteAuthorization.json
 */
async function apiManagementDeleteAuthorization() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.authorization.delete("rg1", "apimService1", "aadwithauthcode", "authz1", "*");
}

async function main() {
  await apiManagementDeleteAuthorization();
}

main().catch(console.error);
