// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified saved search in a given workspace.
 *
 * @summary deletes the specified saved search in a given workspace.
 * x-ms-original-file: 2025-07-01/WorkspacesDeleteSavedSearches.json
 */
async function savedSearchesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.savedSearches.delete("TestRG", "TestWS", "00000000-0000-0000-0000-000000000000");
}

async function main(): Promise<void> {
  await savedSearchesDelete();
}

main().catch(console.error);
