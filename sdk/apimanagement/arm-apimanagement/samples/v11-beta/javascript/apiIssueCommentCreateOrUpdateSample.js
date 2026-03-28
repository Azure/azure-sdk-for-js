// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new Comment for the Issue in an API or updates an existing one.
 *
 * @summary creates a new Comment for the Issue in an API or updates an existing one.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiIssueComment.json
 */
async function apiManagementCreateApiIssueComment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiIssueComment.createOrUpdate(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
    "57d2ef278aa04f0ad01d6cdc",
    "599e29ab193c3c0bd0b3e2fb",
    {
      createdDate: new Date("2018-02-01T22:21:20.467Z"),
      text: "Issue comment.",
      userId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/users/1",
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateApiIssueComment();
}

main().catch(console.error);
