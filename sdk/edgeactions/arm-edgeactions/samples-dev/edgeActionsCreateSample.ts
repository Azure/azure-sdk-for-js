// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeActionsManagementClient } from "@azure/arm-edgeactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a EdgeAction
 *
 * @summary create a EdgeAction
 * x-ms-original-file: 2025-12-01-preview/EdgeActions_Create.json
 */
async function createEdgeAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const result = await client.edgeActions.create("testrg", "edgeAction1", {
    location: "global",
    sku: { name: "Standard", tier: "Standard" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createEdgeAction();
}

main().catch(console.error);
