// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GatewayContract, ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a Gateway to be used in Api Management instance.
 *
 * @summary Creates or updates a Gateway to be used in Api Management instance.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateGateway.json
 */
async function apiManagementCreateGateway(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const gatewayId = "gw1";
  const parameters: GatewayContract = {
    description: "my gateway 1",
    locationData: { name: "my location" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gateway.createOrUpdate(
    resourceGroupName,
    serviceName,
    gatewayId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateGateway();
}

main().catch(console.error);
