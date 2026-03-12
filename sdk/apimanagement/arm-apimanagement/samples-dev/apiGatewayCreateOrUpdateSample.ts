// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates an API Management gateway. This is long running operation and could take several minutes to complete.
 *
 * @summary Creates or updates an API Management gateway. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateStandardGateway.json
 */

import {
  ApiManagementGatewayResource,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateStandardGateway(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "apimGateway1";
  const parameters: ApiManagementGatewayResource = {
    backend: {
      subnet: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vn1/subnets/sn1",
      },
    },
    location: "South Central US",
    sku: { name: "Standard", capacity: 1 },
    tags: { name: "Contoso", test: "User" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiGateway.beginCreateOrUpdateAndWait(
    resourceGroupName,
    gatewayName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an API Management gateway. This is long running operation and could take several minutes to complete.
 *
 * @summary Creates or updates an API Management gateway. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateWorkspacePremiumGateway.json
 */
async function apiManagementCreateWorkspacePremiumGateway(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "apimGateway1";
  const parameters: ApiManagementGatewayResource = {
    backend: {
      subnet: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vn1/subnets/sn1",
      },
    },
    location: "South Central US",
    sku: { name: "WorkspaceGatewayPremium", capacity: 1 },
    tags: { name: "Contoso", test: "User" },
    virtualNetworkType: "External",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiGateway.beginCreateOrUpdateAndWait(
    resourceGroupName,
    gatewayName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateStandardGateway();
  await apiManagementCreateWorkspacePremiumGateway();
}

main().catch(console.error);
