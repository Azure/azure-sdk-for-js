// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified operation from the specified tag.
 *
 * @summary Deletes the specified operation from the specified tag.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementDeleteTagOperationLink.json
 */
async function apiManagementDeleteTagOperationLink(): Promise<void> {
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
  const result = await client.tagOperationLink.delete(
    resourceGroupName,
    serviceName,
    tagId,
    operationLinkId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementDeleteTagOperationLink();
}

main().catch(console.error);
