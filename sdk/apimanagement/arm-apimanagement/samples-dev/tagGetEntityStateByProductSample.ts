// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the entity state version of the tag specified by its identifier.
 *
 * @summary Gets the entity state version of the tag specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementHeadProductTag.json
 */
async function apiManagementHeadProductTag(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const productId = "59306a29e4bbd510dc24e5f8";
  const tagId = "59306a29e4bbd510dc24e5f9";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tag.getEntityStateByProduct(
    resourceGroupName,
    serviceName,
    productId,
    tagId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementHeadProductTag();
}

main().catch(console.error);
