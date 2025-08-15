// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ApiManagementGatewayConfigConnectionResource,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates an API Management gateway config connection. This is long running operation and could take several minutes to complete.
 *
 * @summary Creates or updates an API Management gateway config connection. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateGatewayConfigConnection.json
 */
async function apiManagementCreateGatewayConfigConnection(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "standard-gw-01";
  const configConnectionName = "gcc-01";
  const parameters: ApiManagementGatewayConfigConnectionResource = {
    sourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/services/apim-service-1/workspaces/ws-001",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result =
    await client.apiGatewayConfigConnection.beginCreateOrUpdateAndWait(
      resourceGroupName,
      gatewayName,
      configConnectionName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateGatewayConfigConnection();
}

main().catch(console.error);
