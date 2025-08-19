// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ProductDeleteOptionalParams,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete product.
 *
 * @summary Delete product.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementDeleteProduct.json
 */
async function apiManagementDeleteProduct(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const productId = "testproduct";
  const ifMatch = "*";
  const deleteSubscriptions = true;
  const options: ProductDeleteOptionalParams = { deleteSubscriptions };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.product.delete(
    resourceGroupName,
    serviceName,
    productId,
    ifMatch,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementDeleteProduct();
}

main().catch(console.error);
