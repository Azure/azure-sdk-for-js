// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Adds an API to the specified Gateway.
 *
 * @summary Adds an API to the specified Gateway.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateGatewayApi.json
 */

import {
  AssociationContract,
  GatewayApiCreateOrUpdateOptionalParams,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateGatewayApi(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const gatewayId = "gw1";
  const apiId = "echo-api";
  const parameters: AssociationContract = { provisioningState: "created" };
  const options: GatewayApiCreateOrUpdateOptionalParams = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gatewayApi.createOrUpdate(
    resourceGroupName,
    serviceName,
    gatewayId,
    apiId,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateGatewayApi();
}

main().catch(console.error);
