// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of the Gateway specified by its identifier.
 *
 * @summary gets the details of the Gateway specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetGateway.json
 */
async function apiManagementGetGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gateway.get("rg1", "apimService1", "gw1");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetGateway();
}

main().catch(console.error);
