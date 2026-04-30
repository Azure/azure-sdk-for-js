// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeActionsManagementClient } = require("@azure/arm-edgeactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a EdgeAction
 *
 * @summary get a EdgeAction
 * x-ms-original-file: 2025-12-01-preview/EdgeActions_Get.json
 */
async function getEdgeAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const result = await client.edgeActions.get("testrg", "edgeAction1");
  console.log(result);
}

async function main() {
  await getEdgeAction();
}

main().catch(console.error);
