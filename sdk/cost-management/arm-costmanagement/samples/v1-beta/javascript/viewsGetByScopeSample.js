// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the view for the defined scope by view name.
 *
 * @summary gets the view for the defined scope by view name.
 * x-ms-original-file: 2025-03-01/ViewByResourceGroup.json
 */
async function resourceGroupView() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.views.getByScope(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG",
    "swaggerExample",
  );
  console.log(result);
}

async function main() {
  await resourceGroupView();
}

main().catch(console.error);
