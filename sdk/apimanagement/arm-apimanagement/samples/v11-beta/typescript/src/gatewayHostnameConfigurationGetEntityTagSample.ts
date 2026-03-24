// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks that hostname configuration entity specified by identifier exists for specified Gateway entity.
 *
 * @summary checks that hostname configuration entity specified by identifier exists for specified Gateway entity.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadGatewayHostnameConfiguration.json
 */
async function apiManagementHeadGatewayHostnameConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.gatewayHostnameConfiguration.getEntityTag("rg1", "apimService1", "gw1", "default");
}

async function main(): Promise<void> {
  await apiManagementHeadGatewayHostnameConfiguration();
}

main().catch(console.error);
