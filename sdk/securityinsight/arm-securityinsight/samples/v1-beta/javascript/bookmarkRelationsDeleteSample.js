// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the bookmark relation.
 *
 * @summary delete the bookmark relation.
 * x-ms-original-file: 2025-07-01-preview/bookmarks/relations/DeleteBookmarkRelation.json
 */
async function deleteTheBookmarkRelation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.bookmarkRelations.delete(
    "myRg",
    "myWorkspace",
    "2216d0e1-91e3-4902-89fd-d2df8c535096",
    "4bb36b7b-26ff-4d1c-9cbe-0d8ab3da0014",
  );
}

async function main() {
  await deleteTheBookmarkRelation();
}

main().catch(console.error);
