// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the specific OpenID Connect Provider.
 *
 * @summary updates the specific OpenID Connect Provider.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateOpenIdConnectProvider.json
 */
async function apiManagementUpdateOpenIdConnectProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.openIdConnectProvider.update(
    "rg1",
    "apimService1",
    "templateOpenIdConnect2",
    "*",
    { clientSecret: "updatedsecret", useInApiDocumentation: true, useInTestConsole: false },
  );
  console.log(result);
}

async function main() {
  await apiManagementUpdateOpenIdConnectProvider();
}

main().catch(console.error);
