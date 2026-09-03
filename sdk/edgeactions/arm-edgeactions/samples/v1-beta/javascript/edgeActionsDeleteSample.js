// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeActionsManagementClient } = require("@azure/arm-edgeactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a EdgeAction
 *
 * @summary delete a EdgeAction
 * x-ms-original-file: 2025-12-01-preview/EdgeActions_Delete.json
 */
async function deleteEdgeAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  await client.edgeActions.delete("testrg", "edgeAction1");
}

async function main() {
  await deleteEdgeAction();
}

main().catch(console.error);
