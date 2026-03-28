// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing API Management gateway.
 *
 * @summary deletes an existing API Management gateway.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGatewayDeleteGateway.json
 */
async function apiManagementGatewayDeleteGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiGateway.delete("rg1", "example-gateway");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGatewayDeleteGateway();
}

main().catch(console.error);
