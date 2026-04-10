// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a database advisor.
 *
 * @summary gets a database advisor.
 * x-ms-original-file: 2025-02-01-preview/DatabaseAdvisorGet.json
 */
async function getDatabaseAdvisor() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseAdvisors.get(
    "workloadinsight-demos",
    "misosisvr",
    "IndexAdvisor_test_3",
    "CreateIndex",
  );
  console.log(result);
}

async function main() {
  await getDatabaseAdvisor();
}

main().catch(console.error);
