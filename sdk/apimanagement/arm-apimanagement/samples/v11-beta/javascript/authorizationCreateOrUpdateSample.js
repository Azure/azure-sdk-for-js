// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates authorization.
 *
 * @summary creates or updates authorization.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateAuthorizationAADAuthCode.json
 */
async function apiManagementCreateAuthorizationAADAuthCode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorization.createOrUpdate(
    "rg1",
    "apimService1",
    "aadwithauthcode",
    "authz2",
    { authorizationType: "OAuth2", oAuth2GrantType: "AuthorizationCode" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates authorization.
 *
 * @summary creates or updates authorization.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateAuthorizationAADClientCred.json
 */
async function apiManagementCreateAuthorizationAADClientCred() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorization.createOrUpdate(
    "rg1",
    "apimService1",
    "aadwithclientcred",
    "authz1",
    {
      authorizationType: "OAuth2",
      oAuth2GrantType: "AuthorizationCode",
      parameters: { clientId: "clientsecretid", clientSecret: "clientsecretvalue" },
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateAuthorizationAADAuthCode();
  await apiManagementCreateAuthorizationAADClientCred();
}

main().catch(console.error);
