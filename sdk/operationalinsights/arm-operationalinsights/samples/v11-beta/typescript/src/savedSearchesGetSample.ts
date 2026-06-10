// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified saved search for a given workspace.
 *
 * @summary gets the specified saved search for a given workspace.
 * x-ms-original-file: 2025-07-01/WorkspacesSavedSearchesGet.json
 */
async function savedSearchesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.savedSearches.get(
    "TestRG",
    "TestWS",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await savedSearchesGet();
}

main().catch(console.error);
