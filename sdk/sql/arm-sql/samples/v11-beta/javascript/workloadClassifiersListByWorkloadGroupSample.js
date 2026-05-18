// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of workload classifiers for a workload group
 *
 * @summary gets the list of workload classifiers for a workload group
 * x-ms-original-file: 2025-02-01-preview/GetWorkloadClassifierList.json
 */
async function getTheListOfWorkloadClassifiersForAWorkloadGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workloadClassifiers.listByWorkloadGroup(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    "wlm_workloadgroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getTheListOfWorkloadClassifiersForAWorkloadGroup();
}

main().catch(console.error);
