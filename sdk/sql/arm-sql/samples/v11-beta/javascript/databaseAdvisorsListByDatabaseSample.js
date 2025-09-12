// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of database advisors.
 *
 * @summary Gets a list of database advisors.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/DatabaseAdvisorList.json
 */
async function listOfDatabaseAdvisors() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "workloadinsight-demos";
  const serverName = "misosisvr";
  const databaseName = "IndexAdvisor_test_3";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseAdvisors.listByDatabase(
    resourceGroupName,
    serverName,
    databaseName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets a list of database advisors.
 *
 * @summary Gets a list of database advisors.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/DatabaseRecommendedActionListExpand.json
 */
async function listOfDatabaseRecommendedActionsForAllAdvisors() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "workloadinsight-demos";
  const serverName = "misosisvr";
  const databaseName = "IndexAdvisor_test_3";
  const expand = "recommendedActions";
  const options = { expand };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseAdvisors.listByDatabase(
    resourceGroupName,
    serverName,
    databaseName,
    options,
  );
  console.log(result);
}

async function main() {
  await listOfDatabaseAdvisors();
  await listOfDatabaseRecommendedActionsForAllAdvisors();
}

main().catch(console.error);
