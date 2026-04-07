// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of database advisors.
 *
 * @summary gets a list of database advisors.
 * x-ms-original-file: 2025-02-01-preview/DatabaseAdvisorList.json
 */
async function listOfDatabaseAdvisors(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databaseAdvisors.listByDatabase(
    "workloadinsight-demos",
    "misosisvr",
    "IndexAdvisor_test_3",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a list of database advisors.
 *
 * @summary gets a list of database advisors.
 * x-ms-original-file: 2025-02-01-preview/DatabaseRecommendedActionListExpand.json
 */
async function listOfDatabaseRecommendedActionsForAllAdvisors(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databaseAdvisors.listByDatabase(
    "workloadinsight-demos",
    "misosisvr",
    "IndexAdvisor_test_3",
    { expand: "recommendedActions" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listOfDatabaseAdvisors();
  await listOfDatabaseRecommendedActionsForAllAdvisors();
}

main().catch(console.error);
