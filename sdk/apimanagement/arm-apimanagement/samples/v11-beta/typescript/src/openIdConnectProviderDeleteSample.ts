// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes specific OpenID Connect Provider of the API Management service instance.
 *
 * @summary deletes specific OpenID Connect Provider of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteOpenIdConnectProvider.json
 */
async function apiManagementDeleteOpenIdConnectProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.openIdConnectProvider.delete("rg1", "apimService1", "templateOpenIdConnect3", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteOpenIdConnectProvider();
}

main().catch(console.error);
