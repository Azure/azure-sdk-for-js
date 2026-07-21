// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all bookmark relations.
 *
 * @summary gets all bookmark relations.
 * x-ms-original-file: 2025-07-01-preview/bookmarks/relations/GetAllBookmarkRelations.json
 */
async function getAllBookmarkRelations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bookmarkRelations.list(
    "myRg",
    "myWorkspace",
    "2216d0e1-91e3-4902-89fd-d2df8c535096",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllBookmarkRelations();
}

main().catch(console.error);
