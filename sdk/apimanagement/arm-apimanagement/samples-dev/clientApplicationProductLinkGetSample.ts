// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the product link for the client application.
 *
 * @summary gets the product link for the client application.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetClientApplicationProductLink.json
 */
async function apiManagementGetProductApiLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.clientApplicationProductLink.get(
    "rg1",
    "apimService1",
    "testAppId",
    "link1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetProductApiLink();
}

main().catch(console.error);
