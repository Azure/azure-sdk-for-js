// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an API Management gateway config connection resource description.
 *
 * @summary gets an API Management gateway config connection resource description.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetGatewayConfigConnection.json
 */
async function apiManagementGetGatewayConfigConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiGatewayConfigConnection.get("rg1", "standard-gw-01", "gcc-01");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetGatewayConfigConnection();
}

main().catch(console.error);
