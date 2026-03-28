// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to confirm valid consent code to suppress Authorizations anti-phishing page.
 *
 * @summary confirm valid consent code to suppress Authorizations anti-phishing page.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementPostAuthorizationConfirmConsentCodeRequest.json
 */
async function apiManagementPostAuthorizationConfirmConsentCodeRequest() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.authorization.confirmConsentCode(
    "rg1",
    "apimService1",
    "aadwithauthcode",
    "authz1",
    { consentCode: "theconsentcode" },
  );
}

async function main() {
  await apiManagementPostAuthorizationConfirmConsentCodeRequest();
}

main().catch(console.error);
