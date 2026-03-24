// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the bookmark.
 *
 * @summary creates or updates the bookmark.
 * x-ms-original-file: 2025-07-01-preview/bookmarks/CreateBookmark.json
 */
async function createsOrUpdatesABookmark() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.bookmarks.createOrUpdate(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
    {
      etag: '"0300bf09-0000-0000-0000-5c37296e0000"',
      created: new Date("2021-09-01T13:15:30Z"),
      createdBy: { objectId: "2046feea-040d-4a46-9e2b-91c2941bfa70" },
      displayName: "My bookmark",
      entityMappings: [
        {
          entityType: "Account",
          fieldMappings: [{ identifier: "Fullname", value: "johndoe@microsoft.com" }],
        },
      ],
      labels: ["Tag1", "Tag2"],
      notes: "Found a suspicious activity",
      query: "SecurityEvent | where TimeGenerated > ago(1d) and TimeGenerated < ago(2d)",
      queryResult: "Security Event query result",
      tactics: ["Execution"],
      techniques: ["T1609"],
      updated: new Date("2021-09-01T13:15:30Z"),
      updatedBy: { objectId: "2046feea-040d-4a46-9e2b-91c2941bfa70" },
    },
  );
  console.log(result);
}

async function main() {
  await createsOrUpdatesABookmark();
}

main().catch(console.error);
