// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates the bookmark relation.
 *
 * @summary creates the bookmark relation.
 * x-ms-original-file: 2025-07-01-preview/bookmarks/relations/CreateBookmarkRelation.json
 */
async function createsOrUpdatesABookmarkRelation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.bookmarkRelations.createOrUpdate(
    "myRg",
    "myWorkspace",
    "2216d0e1-91e3-4902-89fd-d2df8c535096",
    "4bb36b7b-26ff-4d1c-9cbe-0d8ab3da0014",
    {
      relatedResourceId:
        "/subscriptions/d0cfe6b2-9ac0-4464-9919-dccaee2e48c0/resourceGroups/myRg/providers/Microsoft.OperationalInsights/workspaces/myWorkspace/providers/Microsoft.SecurityInsights/incidents/afbd324f-6c48-459c-8710-8d1e1cd03812",
    },
  );
  console.log(result);
}

async function main() {
  await createsOrUpdatesABookmarkRelation();
}

main().catch(console.error);
