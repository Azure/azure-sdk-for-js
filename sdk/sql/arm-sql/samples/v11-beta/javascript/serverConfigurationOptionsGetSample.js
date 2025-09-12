// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets managed instance server configuration option.
 *
 * @summary Gets managed instance server configuration option.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ServerConfigurationOptionGet.json
 */
async function getsManagedInstanceServerConfigurationOption() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "testrg";
  const managedInstanceName = "testinstance";
  const serverConfigurationOptionName = "allowPolybaseExport";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverConfigurationOptions.get(
    resourceGroupName,
    managedInstanceName,
    serverConfigurationOptionName,
  );
  console.log(result);
}

async function main() {
  await getsManagedInstanceServerConfigurationOption();
}

main().catch(console.error);
