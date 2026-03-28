// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified comment from an Issue.
 *
 * @summary deletes the specified comment from an Issue.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteApiIssueComment.json
 */
async function apiManagementDeleteApiIssueComment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiIssueComment.delete(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
    "57d2ef278aa04f0ad01d6cdc",
    "599e29ab193c3c0bd0b3e2fb",
    "*",
  );
}

async function main(): Promise<void> {
  await apiManagementDeleteApiIssueComment();
}

main().catch(console.error);
