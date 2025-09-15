// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Fetches trace collected by gateway.
 *
 * @summary Fetches trace collected by gateway.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGatewayListTrace.json
 */

import {
  GatewayListTraceContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementGatewayListTrace(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const gatewayId = "gw1";
  const parameters: GatewayListTraceContract = {
    traceId: "CrDvXXXXXXXXXXXXXVU3ZA2-1",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gateway.listTrace(
    resourceGroupName,
    serviceName,
    gatewayId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGatewayListTrace();
}

main().catch(console.error);
