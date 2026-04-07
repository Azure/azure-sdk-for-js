// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets current instance sql agent configuration.
 *
 * @summary gets current instance sql agent configuration.
 * x-ms-original-file: 2025-02-01-preview/SqlAgentConfigurationGet.json
 */
async function getsCurrentInstanceSqlAgentConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.sqlAgent.get("sqlcrudtest-7398", "sqlcrudtest-4645");
  console.log(result);
}

async function main() {
  await getsCurrentInstanceSqlAgentConfiguration();
}

main().catch(console.error);
