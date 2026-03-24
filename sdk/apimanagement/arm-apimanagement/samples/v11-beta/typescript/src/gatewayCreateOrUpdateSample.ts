// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Gateway to be used in Api Management instance.
 *
 * @summary creates or updates a Gateway to be used in Api Management instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateGateway.json
 */
async function apiManagementCreateGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gateway.createOrUpdate("rg1", "apimService1", "gw1", {
    description: "my gateway 1",
    locationData: { name: "my location" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateGateway();
}

main().catch(console.error);
