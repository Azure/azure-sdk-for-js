// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeActionsManagementClient } = require("@azure/arm-edgeactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list EdgeAction resources by subscription ID
 *
 * @summary list EdgeAction resources by subscription ID
 * x-ms-original-file: 2025-12-01-preview/EdgeActions_ListBySubscription.json
 */
async function listEdgeActionsBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.edgeActions.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listEdgeActionsBySubscription();
}

main().catch(console.error);
