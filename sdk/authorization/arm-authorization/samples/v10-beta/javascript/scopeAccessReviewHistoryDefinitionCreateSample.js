// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a scheduled or one-time Access Review History Definition
 *
 * @summary create a scheduled or one-time Access Review History Definition
 * x-ms-original-file: 2021-12-01-preview/PutAccessReviewHistoryDefinition.json
 */
async function putAccessReviewHistoryDefinition() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.scopeAccessReviewHistoryDefinition.create(
    "subscriptions/129a304b-4aea-4b86-a9f7-ba7e2b23737a",
    "44724910-d7a5-4c29-b28f-db73e717165a",
    {},
  );
  console.log(result);
}

async function main() {
  await putAccessReviewHistoryDefinition();
}

main().catch(console.error);
