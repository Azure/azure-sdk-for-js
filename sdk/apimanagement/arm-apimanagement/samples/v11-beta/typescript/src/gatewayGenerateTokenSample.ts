// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the Shared Access Authorization Token for the gateway.
 *
 * @summary gets the Shared Access Authorization Token for the gateway.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGatewayGenerateToken.json
 */
async function apiManagementGatewayGenerateToken(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gateway.generateToken("rg1", "apimService1", "gw1", {
    expiry: new Date("2020-04-21T00:44:24.2845269Z"),
    keyType: "primary",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGatewayGenerateToken();
}

main().catch(console.error);
