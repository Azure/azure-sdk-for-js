// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the entity state (Etag) version of the schema specified by its identifier.
 *
 * @summary Gets the entity state (Etag) version of the schema specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementHeadWorkspaceApiSchema.json
 */
async function apiManagementHeadWorkspaceApiSchema(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const apiId = "57d1f7558aa04f15146d9d8a";
  const schemaId = "ec12520d-9d48-4e7b-8f39-698ca2ac63f1";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiSchema.getEntityTag(
    resourceGroupName,
    serviceName,
    workspaceId,
    apiId,
    schemaId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementHeadWorkspaceApiSchema();
}

main().catch(console.error);
