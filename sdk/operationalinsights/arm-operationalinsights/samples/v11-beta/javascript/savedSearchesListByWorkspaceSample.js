// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the saved searches for a given Log Analytics Workspace
 *
 * @summary gets the saved searches for a given Log Analytics Workspace
 * x-ms-original-file: 2025-07-01/SavedSearchesListByWorkspace.json
 */
async function savedSearchesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.savedSearches.listByWorkspace("TestRG", "TestWS");
  console.log(result);
}

async function main() {
  await savedSearchesList();
}

main().catch(console.error);
