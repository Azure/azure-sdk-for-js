// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the details of the authorization server specified by its identifier.
 *
 * @summary updates the details of the authorization server specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateAuthorizationServer.json
 */
async function apiManagementUpdateAuthorizationServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationServer.update(
    "rg1",
    "apimService1",
    "newauthServer",
    "*",
    {
      clientId: "update",
      clientSecret: "updated",
      useInApiDocumentation: true,
      useInTestConsole: false,
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementUpdateAuthorizationServer();
}

main().catch(console.error);
