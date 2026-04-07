// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a workload classifier
 *
 * @summary gets a workload classifier
 * x-ms-original-file: 2025-02-01-preview/GetWorkloadClassifier.json
 */
async function getsAWorkloadClassifierForADataWarehouse(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.workloadClassifiers.get(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    "wlm_workloadgroup",
    "wlm_classifier",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsAWorkloadClassifierForADataWarehouse();
}

main().catch(console.error);
