// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates a uri which can be used to retrieve review history data. This URI has a TTL of 1 day and can be retrieved by fetching the accessReviewHistoryDefinition object.
 *
 * @summary generates a uri which can be used to retrieve review history data. This URI has a TTL of 1 day and can be retrieved by fetching the accessReviewHistoryDefinition object.
 * x-ms-original-file: 2021-12-01-preview/PostAccessReviewHistoryDefinitionInstance.json
 */
async function postAccessReviewHistoryDefinitionInstance() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.scopeAccessReviewHistoryDefinitionInstance.generateDownloadUri(
    "subscriptions/129a304b-4aea-4b86-a9f7-ba7e2b23737a",
    "44724910-d7a5-4c29-b28f-db73e717165a",
    "9038f4f3-3d8d-43c3-8ede-669ea082c43b",
  );
  console.log(result);
}

async function main() {
  await postAccessReviewHistoryDefinitionInstance();
}

main().catch(console.error);
