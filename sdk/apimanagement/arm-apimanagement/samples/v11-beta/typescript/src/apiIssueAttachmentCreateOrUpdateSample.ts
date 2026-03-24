// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new Attachment for the Issue in an API or updates an existing one.
 *
 * @summary creates a new Attachment for the Issue in an API or updates an existing one.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiIssueAttachment.json
 */
async function apiManagementCreateApiIssueAttachment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiIssueAttachment.createOrUpdate(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
    "57d2ef278aa04f0ad01d6cdc",
    "57d2ef278aa04f0888cba3f3",
    { content: "IEJhc2U2NA==", contentFormat: "image/jpeg", title: "Issue attachment." },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateApiIssueAttachment();
}

main().catch(console.error);
