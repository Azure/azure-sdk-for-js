// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeActionsManagementClient } = require("@azure/arm-edgeactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to swap the default version for the edge action.
 *
 * @summary swap the default version for the edge action.
 * x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_SwapDefault.json
 */
async function swapDefaultVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  await client.edgeActionVersions.swapDefault("testrg", "edgeAction1", "1.0");
}

async function main() {
  await swapDefaultVersion();
}

main().catch(console.error);
