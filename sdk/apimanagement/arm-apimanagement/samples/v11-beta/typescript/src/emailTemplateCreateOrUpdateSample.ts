// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an Email Template.
 *
 * @summary updates an Email Template.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateTemplate.json
 */
async function apiManagementCreateTemplate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.emailTemplate.createOrUpdate(
    "rg1",
    "apimService1",
    "newIssueNotificationMessage",
    { subject: "Your request for $IssueName was successfully received." },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateTemplate();
}

main().catch(console.error);
