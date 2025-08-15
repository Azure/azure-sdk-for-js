// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the policy configuration at the Product level.
 *
 * @summary Get the policy configuration at the Product level.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementListWorkspaceProductPolicies.json
 */
async function apiManagementListWorkspaceProductPolicies(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const productId = "armTemplateProduct4";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceProductPolicy.listByProduct(
    resourceGroupName,
    serviceName,
    workspaceId,
    productId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementListWorkspaceProductPolicies();
}

main().catch(console.error);
