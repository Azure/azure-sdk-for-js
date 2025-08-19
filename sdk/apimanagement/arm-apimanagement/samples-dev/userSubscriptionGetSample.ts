// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the specified Subscription entity associated with a particular user.
 *
 * @summary Gets the specified Subscription entity associated with a particular user.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetUserSubscription.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementGetUserSubscription(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const userId = "1";
  const sid = "5fa9b096f3df14003c070001";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.userSubscription.get(
    resourceGroupName,
    serviceName,
    userId,
    sid,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetUserSubscription();
}

main().catch(console.error);
