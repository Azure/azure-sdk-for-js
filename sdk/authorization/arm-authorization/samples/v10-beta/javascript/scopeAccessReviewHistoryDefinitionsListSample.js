// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the accessReviewHistoryDefinitions available from this provider, definition instances are only available for 30 days after creation.
 *
 * @summary lists the accessReviewHistoryDefinitions available from this provider, definition instances are only available for 30 days after creation.
 * x-ms-original-file: 2021-12-01-preview/GetAccessReviewHistoryDefinitions.json
 */
async function getAccessReviewHistoryDefinitions() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.scopeAccessReviewHistoryDefinitions.list(
    "subscriptions/129a304b-4aea-4b86-a9f7-ba7e2b23737a",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAccessReviewHistoryDefinitions();
}

main().catch(console.error);
