// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specific authorization server instance.
 *
 * @summary deletes specific authorization server instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteAuthorizationServer.json
 */
async function apiManagementDeleteAuthorizationServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.authorizationServer.delete("rg1", "apimService1", "newauthServer2", "*");
}

async function main() {
  await apiManagementDeleteAuthorizationServer();
}

main().catch(console.error);
