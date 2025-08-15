// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ProductUpdateParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update existing product details.
 *
 * @summary Update existing product details.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUpdateProduct.json
 */
async function apiManagementUpdateProduct(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const productId = "testproduct";
  const ifMatch = "*";
  const parameters: ProductUpdateParameters = {
    displayName: "Test Template ProductName 4",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.product.update(
    resourceGroupName,
    serviceName,
    productId,
    ifMatch,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateProduct();
}

main().catch(console.error);
