// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Detach the tag from the Product.
 *
 * @summary Detach the tag from the Product.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementDeleteProductTag.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementDeleteProductTag(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const productId = "59d5b28d1f7fab116c282650";
  const tagId = "59d5b28e1f7fab116402044e";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tag.detachFromProduct(
    resourceGroupName,
    serviceName,
    productId,
    tagId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementDeleteProductTag();
}

main().catch(console.error);
