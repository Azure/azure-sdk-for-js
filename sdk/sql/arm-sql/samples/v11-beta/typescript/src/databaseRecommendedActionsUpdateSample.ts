// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a database recommended action.
 *
 * @summary updates a database recommended action.
 * x-ms-original-file: 2025-02-01-preview/DatabaseRecommendedActionUpdate.json
 */
async function updateDatabaseRecommendedAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databaseRecommendedActions.update(
    "workloadinsight-demos",
    "misosisvr",
    "IndexAdvisor_test_3",
    "CreateIndex",
    "IR_[CRM]_[DataPoints]_4821CD2F9510D98184BB",
    { state: { currentValue: "Pending" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateDatabaseRecommendedAction();
}

main().catch(console.error);
