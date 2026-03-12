// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the entity state (ETag) version of the developer portal's content item specified by its identifier.
 *
 * @summary Returns the entity state (ETag) version of the developer portal's content item specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementHeadContentTypeContentItem.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementHeadContentTypeContentItem(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const contentTypeId = "page";
  const contentItemId = "4e3cf6a5-574a-ba08-1f23-2e7a38faa6d8";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.contentItem.getEntityTag(
    resourceGroupName,
    serviceName,
    contentTypeId,
    contentItemId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementHeadContentTypeContentItem();
}

main().catch(console.error);
