// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a database data masking policy.
 *
 * @summary Gets a database data masking policy.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/stable/2014-04-01/examples/DataMaskingPolicyGet.json
 */
async function getDataMaskingPolicy() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-6852";
  const serverName = "sqlcrudtest-2080";
  const databaseName = "sqlcrudtest-331";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.dataMaskingPolicies.get(resourceGroupName, serverName, databaseName);
  console.log(result);
}

async function main() {
  await getDataMaskingPolicy();
}

main().catch(console.error);
