// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a server key.
 *
 * @summary Gets a server key.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ServerKeyGet.json
 */
async function getTheServerKey() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-7398";
  const serverName = "sqlcrudtest-4645";
  const keyName = "someVault_someKey_01234567890123456789012345678901";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverKeys.get(resourceGroupName, serverName, keyName);
  console.log(result);
}

async function main() {
  await getTheServerKey();
}

main().catch(console.error);
