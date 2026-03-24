// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified comment from an Issue.
 *
 * @summary deletes the specified comment from an Issue.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteApiIssueAttachment.json
 */
async function apiManagementDeleteApiIssueAttachment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiIssueAttachment.delete(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
    "57d2ef278aa04f0ad01d6cdc",
    "57d2ef278aa04f0888cba3f3",
    "*",
  );
}

async function main() {
  await apiManagementDeleteApiIssueAttachment();
}

main().catch(console.error);
