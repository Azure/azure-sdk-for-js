// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the operation link for the tag.
 *
 * @summary Gets the operation link for the tag.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetTagOperationLink.json
 */
async function apiManagementGetTagOperationLink(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const tagId = "tag1";
  const operationLinkId = "link1";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tagOperationLink.get(
    resourceGroupName,
    serviceName,
    tagId,
    operationLinkId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetTagOperationLink();
}

main().catch(console.error);
