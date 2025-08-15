// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets an API Management gateway config connection resource description.
 *
 * @summary Gets an API Management gateway config connection resource description.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetGatewayConfigConnection.json
 */
async function apiManagementGetGatewayConfigConnection(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "standard-gw-01";
  const configConnectionName = "gcc-01";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiGatewayConfigConnection.get(
    resourceGroupName,
    gatewayName,
    configConnectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetGatewayConfigConnection();
}

main().catch(console.error);
