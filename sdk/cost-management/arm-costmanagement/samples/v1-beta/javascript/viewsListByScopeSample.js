// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all views at the given scope.
 *
 * @summary lists all views at the given scope.
 * x-ms-original-file: 2025-03-01/ViewListByResourceGroup.json
 */
async function resourceGroupViewList() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.views.listByScope(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await resourceGroupViewList();
}

main().catch(console.error);
