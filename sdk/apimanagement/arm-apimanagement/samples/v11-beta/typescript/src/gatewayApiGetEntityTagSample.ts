// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks that API entity specified by identifier is associated with the Gateway entity.
 *
 * @summary checks that API entity specified by identifier is associated with the Gateway entity.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadGatewayApi.json
 */
async function apiManagementHeadGatewayApi(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.gatewayApi.getEntityTag("rg1", "apimService1", "gw1", "api1");
}

async function main(): Promise<void> {
  await apiManagementHeadGatewayApi();
}

main().catch(console.error);
