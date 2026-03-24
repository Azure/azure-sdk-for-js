// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the configuration details of the identity Provider configured in specified service instance.
 *
 * @summary gets the configuration details of the identity Provider configured in specified service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetIdentityProvider.json
 */
async function apiManagementGetIdentityProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.identityProvider.get("rg1", "apimService1", "aadB2C");
  console.log(result);
}

async function main() {
  await apiManagementGetIdentityProvider();
}

main().catch(console.error);
