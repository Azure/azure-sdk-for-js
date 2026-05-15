// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a workload classifier.
 *
 * @summary deletes a workload classifier.
 * x-ms-original-file: 2025-02-01-preview/DeleteWorkloadClassifier.json
 */
async function deleteAWorkloadClassifier(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.workloadClassifiers.delete(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    "wlm_workloadgroup",
    "wlm_workloadclassifier",
  );
}

async function main(): Promise<void> {
  await deleteAWorkloadClassifier();
}

main().catch(console.error);
