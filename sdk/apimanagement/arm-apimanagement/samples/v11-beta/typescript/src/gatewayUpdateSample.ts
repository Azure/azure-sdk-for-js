// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the details of the gateway specified by its identifier.
 *
 * @summary updates the details of the gateway specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateGateway.json
 */
async function apiManagementUpdateGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gateway.update("rg1", "apimService1", "gw1", "*", {
    description: "my gateway 1",
    locationData: { name: "my location" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateGateway();
}

main().catch(console.error);
