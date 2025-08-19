// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Action is invalidating all debug credentials issued for gateway.
 *
 * @summary Action is invalidating all debug credentials issued for gateway.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGatewayInvalidateDebugCredentials.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementGatewayInvalidateDebugCredentials(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const gatewayId = "gw1";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gateway.invalidateDebugCredentials(
    resourceGroupName,
    serviceName,
    gatewayId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGatewayInvalidateDebugCredentials();
}

main().catch(console.error);
