// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerates primary key of existing subscription of the workspace in an API Management service instance.
 *
 * @summary regenerates primary key of existing subscription of the workspace in an API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementWorkspaceSubscriptionRegeneratePrimaryKey.json
 */
async function apiManagementWorkspaceSubscriptionRegeneratePrimaryKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceSubscription.regeneratePrimaryKey("rg1", "apimService1", "wks1", "testsub");
}

async function main(): Promise<void> {
  await apiManagementWorkspaceSubscriptionRegeneratePrimaryKey();
}

main().catch(console.error);
