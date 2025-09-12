// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Fails over from the current primary server to this server. This operation might result in data loss.
 *
 * @summary Fails over from the current primary server to this server. This operation might result in data loss.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-05-01-preview/examples/FailoverGroupForceFailoverAllowDataLoss.json
 */
async function forcedFailoverOfAFailoverGroupAllowingDataLoss() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default";
  const serverName = "failover-group-secondary-server";
  const failoverGroupName = "failover-group-test-3";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.failoverGroups.beginForceFailoverAllowDataLossAndWait(
    resourceGroupName,
    serverName,
    failoverGroupName,
  );
  console.log(result);
}

async function main() {
  await forcedFailoverOfAFailoverGroupAllowingDataLoss();
}

main().catch(console.error);
