// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates new authorization server or updates an existing authorization server.
 *
 * @summary creates new authorization server or updates an existing authorization server.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateAuthorizationServer.json
 */
async function apiManagementCreateAuthorizationServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationServer.createOrUpdate(
    "rg1",
    "apimService1",
    "newauthServer",
    {
      description: "test server",
      authorizationEndpoint: "https://www.contoso.com/oauth2/auth",
      authorizationMethods: ["GET"],
      bearerTokenSendingMethods: ["authorizationHeader"],
      clientId: "1",
      clientRegistrationEndpoint: "https://www.contoso.com/apps",
      clientSecret: "2",
      defaultScope: "read write",
      displayName: "test2",
      grantTypes: ["authorizationCode", "implicit"],
      resourceOwnerPassword: "pwd",
      resourceOwnerUsername: "un",
      supportState: true,
      tokenEndpoint: "https://www.contoso.com/oauth2/token",
      useInApiDocumentation: true,
      useInTestConsole: false,
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateAuthorizationServer();
}

main().catch(console.error);
