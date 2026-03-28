// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the specified API of the API Management service instance.
 *
 * @summary updates the specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateApi.json
 */
async function apiManagementUpdateApi(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.update("rg1", "apimService1", "echo-api", "*", {
    path: "newecho",
    displayName: "Echo API New",
    serviceUrl: "http://echoapi.cloudapp.net/api2",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateApi();
}

main().catch(console.error);
