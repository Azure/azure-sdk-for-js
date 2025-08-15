// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the details of the developer portal's content type. Content types describe content items' properties, validation rules, and constraints.
 *
 * @summary Gets the details of the developer portal's content type. Content types describe content items' properties, validation rules, and constraints.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetContentType.json
 */
async function apiManagementGetContentType(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const contentTypeId = "page";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.contentType.get(
    resourceGroupName,
    serviceName,
    contentTypeId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetContentType();
}

main().catch(console.error);
