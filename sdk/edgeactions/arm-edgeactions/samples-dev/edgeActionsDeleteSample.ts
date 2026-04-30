// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeActionsManagementClient } from "@azure/arm-edgeactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a EdgeAction
 *
 * @summary delete a EdgeAction
 * x-ms-original-file: 2025-12-01-preview/EdgeActions_Delete.json
 */
async function deleteEdgeAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  await client.edgeActions.delete("testrg", "edgeAction1");
}

async function main(): Promise<void> {
  await deleteEdgeAction();
}

main().catch(console.error);
