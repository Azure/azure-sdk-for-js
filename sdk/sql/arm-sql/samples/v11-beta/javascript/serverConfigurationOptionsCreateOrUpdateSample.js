// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates managed instance server configuration option.
 *
 * @summary updates managed instance server configuration option.
 * x-ms-original-file: 2025-02-01-preview/ServerConfigurationOptionUpdate.json
 */
async function updatesManagedInstanceServerConfigurationOption() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverConfigurationOptions.createOrUpdate(
    "testrg",
    "testinstance",
    "allowPolybaseExport",
    { serverConfigurationOptionValue: 1 },
  );
  console.log(result);
}

async function main() {
  await updatesManagedInstanceServerConfigurationOption();
}

main().catch(console.error);
