// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specified subscription.
 *
 * @summary Deletes the specified subscription.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementDeleteWorkspaceSubscription.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementDeleteWorkspaceSubscription(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const sid = "testsub";
  const ifMatch = "*";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceSubscription.delete(
    resourceGroupName,
    serviceName,
    workspaceId,
    sid,
    ifMatch,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementDeleteWorkspaceSubscription();
}

main().catch(console.error);
