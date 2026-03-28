// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specific access policy from the Authorization.
 *
 * @summary deletes specific access policy from the Authorization.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteAuthorizationAccessPolicy.json
 */
async function apiManagementDeleteAuthorizationAccessPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.authorizationAccessPolicy.delete(
    "rg1",
    "apimService1",
    "aadwithauthcode",
    "authz1",
    "fe0bed83-631f-4149-bd0b-0464b1bc7cab",
    "*",
  );
}

async function main() {
  await apiManagementDeleteAuthorizationAccessPolicy();
}

main().catch(console.error);
