// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specified API from the specified Gateway.
 *
 * @summary Deletes the specified API from the specified Gateway.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementDeleteGatewayApi.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementDeleteGatewayApi(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const gatewayId = "gw1";
  const apiId = "echo-api";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gatewayApi.delete(
    resourceGroupName,
    serviceName,
    gatewayId,
    apiId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementDeleteGatewayApi();
}

main().catch(console.error);
