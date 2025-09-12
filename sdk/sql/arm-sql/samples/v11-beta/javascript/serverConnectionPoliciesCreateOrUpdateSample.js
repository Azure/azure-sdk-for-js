// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates a server connection policy
 *
 * @summary Updates a server connection policy
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-05-01-preview/examples/ServerConnectionPoliciesUpdate.json
 */
async function updatesAServerConnectionPolicy() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "testserver";
  const connectionPolicyName = "default";
  const parameters = { connectionType: "Redirect" };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverConnectionPolicies.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    connectionPolicyName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updatesAServerConnectionPolicy();
}

main().catch(console.error);
