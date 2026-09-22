// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all shared scheduled actions within the given scope.
 *
 * @summary list all shared scheduled actions within the given scope.
 * x-ms-original-file: 2025-03-01/scheduledActions/scheduledActions-list-shared.json
 */
async function scheduledActionsListByScope() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.scheduledActions.listByScope(
    "subscriptions/00000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list all shared scheduled actions within the given scope.
 *
 * @summary list all shared scheduled actions within the given scope.
 * x-ms-original-file: 2025-03-01/scheduledActions/scheduledActions-listWithFilter-shared.json
 */
async function scheduledActionsListByScopeFilterByViewId() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.scheduledActions.listByScope(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    { filter: "properties/viewId eq '/providers/Microsoft.CostManagement/views/swaggerExample'" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await scheduledActionsListByScope();
  await scheduledActionsListByScopeFilterByViewId();
}

main().catch(console.error);
