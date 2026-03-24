// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets API Management issue details
 *
 * @summary gets API Management issue details
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetIssue.json
 */
async function apiManagementGetIssue() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.issue.get("rg1", "apimService1", "57d2ef278aa04f0ad01d6cdc");
  console.log(result);
}

async function main() {
  await apiManagementGetIssue();
}

main().catch(console.error);
