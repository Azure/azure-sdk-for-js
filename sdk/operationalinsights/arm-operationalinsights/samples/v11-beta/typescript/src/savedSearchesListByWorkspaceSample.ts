// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the saved searches for a given Log Analytics Workspace
 *
 * @summary gets the saved searches for a given Log Analytics Workspace
 * x-ms-original-file: 2025-07-01/SavedSearchesListByWorkspace.json
 */
async function savedSearchesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.savedSearches.listByWorkspace("TestRG", "TestWS");
  console.log(result);
}

async function main(): Promise<void> {
  await savedSearchesList();
}

main().catch(console.error);
