// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a view.
 *
 * @summary the operation to delete a view.
 * x-ms-original-file: 2025-03-01/ViewDeleteByResourceGroup.json
 */
async function resourceGroupDeleteView() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.views.deleteByScope(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG",
    "TestView",
  );
}

async function main() {
  await resourceGroupDeleteView();
}

main().catch(console.error);
