// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reset the Email Template to default template provided by the API Management service instance.
 *
 * @summary reset the Email Template to default template provided by the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteTemplate.json
 */
async function apiManagementDeleteTemplate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.emailTemplate.delete("rg1", "apimService1", "newIssueNotificationMessage", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteTemplate();
}

main().catch(console.error);
