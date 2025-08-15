// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the entity state (Etag) version of the Wiki for a Product specified by its identifier.
 *
 * @summary Gets the entity state (Etag) version of the Wiki for a Product specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementHeadProductWiki.json
 */
async function apiManagementHeadProductWiki(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const productId = "57d1f7558aa04f15146d9d8a";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.productWiki.getEntityTag(
    resourceGroupName,
    serviceName,
    productId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementHeadProductWiki();
}

main().catch(console.error);
