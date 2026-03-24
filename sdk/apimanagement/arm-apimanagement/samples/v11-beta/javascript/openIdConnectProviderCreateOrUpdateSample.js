// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the OpenID Connect Provider.
 *
 * @summary creates or updates the OpenID Connect Provider.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateOpenIdConnectProvider.json
 */
async function apiManagementCreateOpenIdConnectProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.openIdConnectProvider.createOrUpdate(
    "rg1",
    "apimService1",
    "templateOpenIdConnect3",
    {
      clientId: "oidprovidertemplate3",
      clientSecret: "x",
      displayName: "templateoidprovider3",
      metadataEndpoint: "https://oidprovider-template3.net",
      useInApiDocumentation: true,
      useInTestConsole: false,
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateOpenIdConnectProvider();
}

main().catch(console.error);
