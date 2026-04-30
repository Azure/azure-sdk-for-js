// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeActionsManagementClient } = require("@azure/arm-edgeactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a EdgeActionVersion
 *
 * @summary delete a EdgeActionVersion
 * x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_Delete.json
 */
async function deleteEdgeActionVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  await client.edgeActionVersions.delete("testrg", "edgeAction1", "version1");
}

async function main() {
  await deleteEdgeActionVersion();
}

main().catch(console.error);
