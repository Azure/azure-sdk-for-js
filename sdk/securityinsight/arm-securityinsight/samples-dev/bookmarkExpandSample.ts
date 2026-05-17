// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to expand an bookmark
 *
 * @summary expand an bookmark
 * x-ms-original-file: 2025-07-01-preview/bookmarks/expand/PostExpandBookmark.json
 */
async function expandAnBookmark(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.bookmark.expand(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
    {
      endTime: new Date("2020-01-24T17:21:00.000Z"),
      expansionId: "27f76e63-c41b-480f-bb18-12ad2e011d49",
      startTime: new Date("2019-12-25T17:21:00.000Z"),
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await expandAnBookmark();
}

main().catch(console.error);
