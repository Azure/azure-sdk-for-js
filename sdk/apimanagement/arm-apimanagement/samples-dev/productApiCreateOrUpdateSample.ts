// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Adds an API to the specified product.
 *
 * @summary Adds an API to the specified product.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateProductApi.json
 */
async function apiManagementCreateProductApi(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const productId = "testproduct";
  const apiId = "echo-api";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.productApi.createOrUpdate(
    resourceGroupName,
    serviceName,
    productId,
    apiId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateProductApi();
}

main().catch(console.error);
