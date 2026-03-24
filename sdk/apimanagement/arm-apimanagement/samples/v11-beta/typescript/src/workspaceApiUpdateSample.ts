// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the specified API of the workspace in an API Management service instance.
 *
 * @summary updates the specified API of the workspace in an API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateWorkspaceApi.json
 */
async function apiManagementUpdateWorkspaceApi(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApi.update("rg1", "apimService1", "wks1", "echo-api", "*", {
    path: "newecho",
    displayName: "Echo API New",
    serviceUrl: "http://echoapi.cloudapp.net/api2",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateWorkspaceApi();
}

main().catch(console.error);
