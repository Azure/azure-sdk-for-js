// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Puts new sql agent configuration to instance.
 *
 * @summary Puts new sql agent configuration to instance.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/SqlAgentConfigurationPut.json
 */
async function putsNewSqlAgentConfigurationToInstance() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-7398";
  const managedInstanceName = "sqlcrudtest-4645";
  const parameters = { state: "Enabled" };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.sqlAgent.createOrUpdate(
    resourceGroupName,
    managedInstanceName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await putsNewSqlAgentConfigurationToInstance();
}

main().catch(console.error);
