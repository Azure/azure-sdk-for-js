// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates new or updates existing specified API of the workspace in an API Management service instance.
 *
 * @summary creates new or updates existing specified API of the workspace in an API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceApi.json
 */
async function apiManagementCreateWorkspaceApi() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApi.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "tempgroup",
    {
      path: "newapiPath",
      description: "apidescription5200",
      authenticationSettings: {
        oAuth2: { authorizationServerId: "authorizationServerId2283", scope: "oauth2scope2580" },
      },
      displayName: "apiname1463",
      protocols: ["https", "http"],
      serviceUrl: "http://newechoapi.cloudapp.net/api",
      subscriptionKeyParameterNames: { header: "header4520", query: "query3037" },
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateWorkspaceApi();
}

main().catch(console.error);
