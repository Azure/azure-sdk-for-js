// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get tag associated with the Product.
 *
 * @summary Get tag associated with the Product.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetProductTag.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementGetProductTag(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const productId = "59d6bb8f1f7fab13dc67ec9b";
  const tagId = "59306a29e4bbd510dc24e5f9";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tag.getByProduct(
    resourceGroupName,
    serviceName,
    productId,
    tagId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetProductTag();
}

main().catch(console.error);
