// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets list of Database Recommended Actions.
 *
 * @summary gets list of Database Recommended Actions.
 * x-ms-original-file: 2025-02-01-preview/DatabaseRecommendedActionList.json
 */
async function listOfDatabaseRecommendedActions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databaseRecommendedActions.listByDatabaseAdvisor(
    "workloadinsight-demos",
    "misosisvr",
    "IndexAdvisor_test_3",
    "CreateIndex",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listOfDatabaseRecommendedActions();
}

main().catch(console.error);
