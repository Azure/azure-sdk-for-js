// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the email template specified by its identifier.
 *
 * @summary gets the entity state (Etag) version of the email template specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadEmailTemplate.json
 */
async function apiManagementHeadEmailTemplate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.emailTemplate.getEntityTag("rg1", "apimService1", "newIssueNotificationMessage");
}

async function main(): Promise<void> {
  await apiManagementHeadEmailTemplate();
}

main().catch(console.error);
