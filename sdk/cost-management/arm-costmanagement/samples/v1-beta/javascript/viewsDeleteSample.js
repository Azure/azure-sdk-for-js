// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a view.
 *
 * @summary the operation to delete a view.
 * x-ms-original-file: 2025-03-01/PrivateViewDelete.json
 */
async function deletePrivateView() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.views.delete("TestView");
}

async function main() {
  await deletePrivateView();
}

main().catch(console.error);
