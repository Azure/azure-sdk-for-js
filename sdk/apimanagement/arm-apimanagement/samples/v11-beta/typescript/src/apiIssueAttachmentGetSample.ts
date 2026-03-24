// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of the issue Attachment for an API specified by its identifier.
 *
 * @summary gets the details of the issue Attachment for an API specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetApiIssueAttachment.json
 */
async function apiManagementGetApiIssueAttachment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiIssueAttachment.get(
    "rg1",
    "apimService1",
    "57d2ef278aa04f0888cba3f3",
    "57d2ef278aa04f0ad01d6cdc",
    "57d2ef278aa04f0888cba3f3",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetApiIssueAttachment();
}

main().catch(console.error);
