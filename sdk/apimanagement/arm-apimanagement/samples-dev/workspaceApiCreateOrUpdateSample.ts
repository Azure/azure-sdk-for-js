// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ApiCreateOrUpdateParameter,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates new or updates existing specified API of the workspace in an API Management service instance.
 *
 * @summary Creates new or updates existing specified API of the workspace in an API Management service instance.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateWorkspaceApi.json
 */
async function apiManagementCreateWorkspaceApi(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const apiId = "tempgroup";
  const parameters: ApiCreateOrUpdateParameter = {
    path: "newapiPath",
    description: "apidescription5200",
    authenticationSettings: {
      oAuth2: {
        authorizationServerId: "authorizationServerId2283",
        scope: "oauth2scope2580",
      },
    },
    displayName: "apiname1463",
    protocols: ["https", "http"],
    serviceUrl: "http://newechoapi.cloudapp.net/api",
    subscriptionKeyParameterNames: { header: "header4520", query: "query3037" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApi.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    workspaceId,
    apiId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspaceApi();
}

main().catch(console.error);
