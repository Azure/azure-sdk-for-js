// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a database advisor.
 *
 * @summary updates a database advisor.
 * x-ms-original-file: 2025-02-01-preview/DatabaseAdvisorUpdate.json
 */
async function updateDatabaseAdvisor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseAdvisors.update(
    "workloadinsight-demos",
    "misosisvr",
    "IndexAdvisor_test_3",
    "CreateIndex",
    { autoExecuteStatus: "Disabled" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateDatabaseAdvisor();
}

main().catch(console.error);
