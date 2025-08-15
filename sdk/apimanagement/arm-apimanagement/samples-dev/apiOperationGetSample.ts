// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the details of the API Operation specified by its identifier.
 *
 * @summary Gets the details of the API Operation specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetApiOperation.json
 */
async function apiManagementGetApiOperation(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const apiId = "57d2ef278aa04f0888cba3f3";
  const operationId = "57d2ef278aa04f0ad01d6cdc";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiOperation.get(
    resourceGroupName,
    serviceName,
    apiId,
    operationId,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the details of the API Operation specified by its identifier.
 *
 * @summary Gets the details of the API Operation specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetApiOperationPetStore.json
 */
async function apiManagementGetApiOperationPetStore(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const apiId = "swagger-petstore";
  const operationId = "loginUser";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiOperation.get(
    resourceGroupName,
    serviceName,
    apiId,
    operationId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetApiOperation();
  await apiManagementGetApiOperationPetStore();
}

main().catch(console.error);
