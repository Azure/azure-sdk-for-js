// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the view by view name.
 *
 * @summary gets the view by view name.
 * x-ms-original-file: 2025-03-01/PrivateView.json
 */
async function privateView() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.views.get("swaggerExample");
  console.log(result);
}

async function main() {
  await privateView();
}

main().catch(console.error);
