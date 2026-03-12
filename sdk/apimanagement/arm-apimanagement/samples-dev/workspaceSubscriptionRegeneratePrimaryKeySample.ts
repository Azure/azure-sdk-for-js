// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Regenerates primary key of existing subscription of the workspace in an API Management service instance.
 *
 * @summary Regenerates primary key of existing subscription of the workspace in an API Management service instance.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementWorkspaceSubscriptionRegeneratePrimaryKey.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementWorkspaceSubscriptionRegeneratePrimaryKey(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const sid = "testsub";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceSubscription.regeneratePrimaryKey(
    resourceGroupName,
    serviceName,
    workspaceId,
    sid,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementWorkspaceSubscriptionRegeneratePrimaryKey();
}

main().catch(console.error);
