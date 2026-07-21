// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a bookmark relation.
 *
 * @summary gets a bookmark relation.
 * x-ms-original-file: 2025-07-01-preview/bookmarks/relations/GetBookmarkRelationByName.json
 */
async function getABookmarkRelation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.bookmarkRelations.get(
    "myRg",
    "myWorkspace",
    "2216d0e1-91e3-4902-89fd-d2df8c535096",
    "4bb36b7b-26ff-4d1c-9cbe-0d8ab3da0014",
  );
  console.log(result);
}

async function main() {
  await getABookmarkRelation();
}

main().catch(console.error);
