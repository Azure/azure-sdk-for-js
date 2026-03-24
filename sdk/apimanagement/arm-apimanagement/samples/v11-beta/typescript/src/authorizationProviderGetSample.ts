// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of the authorization provider specified by its identifier.
 *
 * @summary gets the details of the authorization provider specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetAuthorizationProvider.json
 */
async function apiManagementGetAuthorizationProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.authorizationProvider.get("rg1", "apimService1", "aadwithauthcode");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetAuthorizationProvider();
}

main().catch(console.error);
