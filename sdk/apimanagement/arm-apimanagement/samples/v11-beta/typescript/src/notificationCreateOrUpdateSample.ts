// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or Update API Management publisher notification.
 *
 * @summary create or Update API Management publisher notification.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateNotification.json
 */
async function apiManagementCreateNotification(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.notification.createOrUpdate(
    "rg1",
    "apimService1",
    "RequestPublisherNotificationMessage",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateNotification();
}

main().catch(console.error);
