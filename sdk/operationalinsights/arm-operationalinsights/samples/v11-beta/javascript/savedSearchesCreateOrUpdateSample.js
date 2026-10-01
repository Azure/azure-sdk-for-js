// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a saved search for a given workspace.
 *
 * @summary creates or updates a saved search for a given workspace.
 * x-ms-original-file: 2025-07-01/WorkspacesSavedSearchesCreateOrUpdate.json
 */
async function savedSearchCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.savedSearches.createOrUpdate(
    "TestRG",
    "TestWS",
    "00000000-0000-0000-0000-000000000000",
    {
      category: "Saved Search Test Category",
      displayName: "Create or Update Saved Search Test",
      functionAlias: "heartbeat_func",
      functionParameters: "a:int=1",
      query: "Heartbeat | summarize Count() by Computer | take a",
      tags: [{ name: "Group", value: "Computer" }],
      version: 2,
    },
  );
  console.log(result);
}

async function main() {
  await savedSearchCreateOrUpdate();
}

main().catch(console.error);
