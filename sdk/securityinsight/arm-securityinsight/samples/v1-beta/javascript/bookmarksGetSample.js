// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a bookmark.
 *
 * @summary gets a bookmark.
 * x-ms-original-file: 2025-07-01-preview/bookmarks/GetBookmarkById.json
 */
async function getABookmark() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.bookmarks.get(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
  );
  console.log(result);
}

async function main() {
  await getABookmark();
}

main().catch(console.error);
