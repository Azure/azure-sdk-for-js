// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the issue Comment for an API specified by its identifier.
 *
 * @summary gets the details of the issue Comment for an API specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetApiIssueComment.json
 */
async function apiManagementGetApiIssueComment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiIssueComment.get(
    "rg1",
    "apimService1",
    "57d2ef278aa04f0888cba3f3",
    "57d2ef278aa04f0ad01d6cdc",
    "599e29ab193c3c0bd0b3e2fb",
  );
  console.log(result);
}

async function main() {
  await apiManagementGetApiIssueComment();
}

main().catch(console.error);
