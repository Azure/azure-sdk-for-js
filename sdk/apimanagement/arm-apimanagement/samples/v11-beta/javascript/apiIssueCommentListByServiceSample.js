// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all comments for the Issue associated with the specified API.
 *
 * @summary lists all comments for the Issue associated with the specified API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListApiIssueComments.json
 */
async function apiManagementListApiIssueComments() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiIssueComment.listByService(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
    "57d2ef278aa04f0ad01d6cdc",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListApiIssueComments();
}

main().catch(console.error);
