// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ApiManagementGatewayUpdateParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates an existing API Management gateway.
 *
 * @summary Updates an existing API Management gateway.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUpdateStandardGateway.json
 */
async function apiManagementUpdateStandardGateway(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "apimGateway1";
  const parameters: ApiManagementGatewayUpdateParameters = {
    sku: { name: "Standard", capacity: 10 },
    tags: { name: "Contoso", test: "User" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiGateway.beginUpdateAndWait(
    resourceGroupName,
    gatewayName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateStandardGateway();
}

main().catch(console.error);
