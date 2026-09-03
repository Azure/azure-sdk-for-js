// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeActionsManagementClient } = require("@azure/arm-edgeactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list EdgeAction resources by resource group
 *
 * @summary list EdgeAction resources by resource group
 * x-ms-original-file: 2025-12-01-preview/EdgeActions_ListByResourceGroup.json
 */
async function listEdgeActionsByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.edgeActions.listByResourceGroup("testrg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listEdgeActionsByResourceGroup();
}

main().catch(console.error);
