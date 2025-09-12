// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes a workload classifier.
 *
 * @summary Deletes a workload classifier.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/DeleteWorkloadClassifier.json
 */
async function deleteAWorkloadClassifier() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const workloadGroupName = "wlm_workloadgroup";
  const workloadClassifierName = "wlm_workloadclassifier";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.workloadClassifiers.beginDeleteAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    workloadGroupName,
    workloadClassifierName,
  );
  console.log(result);
}

async function main() {
  await deleteAWorkloadClassifier();
}

main().catch(console.error);
