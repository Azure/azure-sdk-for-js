// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets managed instance server configuration option.
 *
 * @summary gets managed instance server configuration option.
 * x-ms-original-file: 2025-02-01-preview/ServerConfigurationOptionGet.json
 */
async function getsManagedInstanceServerConfigurationOption() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.serverConfigurationOptions.get(
    "testrg",
    "testinstance",
    "allowPolybaseExport",
  );
  console.log(result);
}

async function main() {
  await getsManagedInstanceServerConfigurationOption();
}

main().catch(console.error);
