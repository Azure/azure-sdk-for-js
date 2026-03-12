// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create new debug credentials for gateway.
 *
 * @summary Create new debug credentials for gateway.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGatewayListDebugCredentials.json
 */

import {
  GatewayListDebugCredentialsContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementGatewayListDebugCredentials(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const gatewayId = "gw1";
  const parameters: GatewayListDebugCredentialsContract = {
    apiId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/apis/a1",
    credentialsExpireAfter: "PT1H",
    purposes: ["tracing"],
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gateway.listDebugCredentials(
    resourceGroupName,
    serviceName,
    gatewayId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGatewayListDebugCredentials();
}

main().catch(console.error);
