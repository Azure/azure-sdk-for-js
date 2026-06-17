// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get access review history definition by definition Id
 *
 * @summary get access review history definition by definition Id
 * x-ms-original-file: 2021-12-01-preview/GetAccessReviewHistoryDefinition.json
 */
async function getAccessReviewHistoryDefinition() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.scopeAccessReviewHistoryDefinitions.getById(
    "subscriptions/129a304b-4aea-4b86-a9f7-ba7e2b23737a",
    "44724910-d7a5-4c29-b28f-db73e717165a",
  );
  console.log(result);
}

async function main() {
  await getAccessReviewHistoryDefinition();
}

main().catch(console.error);
