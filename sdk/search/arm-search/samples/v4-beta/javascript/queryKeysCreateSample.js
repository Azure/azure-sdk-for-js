// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates a new query key for the specified search service. You can create up to 50 query keys per service.
 *
 * @summary generates a new query key for the specified search service. You can create up to 50 query keys per service.
 * x-ms-original-file: 2026-03-01-preview/SearchCreateQueryKey.json
 */
async function searchCreateQueryKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.queryKeys.create(
    "rg1",
    "mysearchservice",
    "An API key granting read-only access to the documents collection of an index.",
  );
  console.log(result);
}

async function main() {
  await searchCreateQueryKey();
}

main().catch(console.error);
