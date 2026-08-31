// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the setting from the given scope by name.
 *
 * @summary get the setting from the given scope by name.
 * x-ms-original-file: 2025-03-01/setting-get.json
 */
async function settingByScope() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.settings.getByScope(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "taginheritance",
  );
  console.log(result);
}

async function main() {
  await settingByScope();
}

main().catch(console.error);
