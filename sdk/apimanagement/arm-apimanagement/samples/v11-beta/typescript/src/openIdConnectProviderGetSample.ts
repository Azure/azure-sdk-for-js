// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets specific OpenID Connect Provider without secrets.
 *
 * @summary gets specific OpenID Connect Provider without secrets.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetOpenIdConnectProvider.json
 */
async function apiManagementGetOpenIdConnectProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.openIdConnectProvider.get(
    "rg1",
    "apimService1",
    "templateOpenIdConnect2",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetOpenIdConnectProvider();
}

main().catch(console.error);
