// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the list of workload classifiers for a workload group
 *
 * @summary Gets the list of workload classifiers for a workload group
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/GetWorkloadClassifierList.json
 */
async function getTheListOfWorkloadClassifiersForAWorkloadGroup() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const workloadGroupName = "wlm_workloadgroup";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workloadClassifiers.listByWorkloadGroup(
    resourceGroupName,
    serverName,
    databaseName,
    workloadGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getTheListOfWorkloadClassifiersForAWorkloadGroup();
}

main().catch(console.error);
