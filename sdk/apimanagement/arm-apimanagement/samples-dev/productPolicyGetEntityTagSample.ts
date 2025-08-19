// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the ETag of the policy configuration at the Product level.
 *
 * @summary Get the ETag of the policy configuration at the Product level.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementHeadProductPolicy.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementHeadProductPolicy(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const productId = "unlimited";
  const policyId = "policy";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.productPolicy.getEntityTag(
    resourceGroupName,
    serviceName,
    productId,
    policyId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementHeadProductPolicy();
}

main().catch(console.error);
