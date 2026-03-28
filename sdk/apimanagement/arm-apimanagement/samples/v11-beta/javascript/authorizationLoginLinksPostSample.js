// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets authorization login links.
 *
 * @summary gets authorization login links.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetAuthorizationLoginRequest.json
 */
async function apiManagementGetAuthorizationLoginRequest() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationLoginLinks.post(
    "rg1",
    "apimService1",
    "aadwithauthcode",
    "authz1",
    { postLoginRedirectUrl: "https://www.bing.com/" },
  );
  console.log(result);
}

async function main() {
  await apiManagementGetAuthorizationLoginRequest();
}

main().catch(console.error);
