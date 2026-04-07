// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update recommended sensitivity labels states of a given database using an operations batch.
 *
 * @summary update recommended sensitivity labels states of a given database using an operations batch.
 * x-ms-original-file: 2025-02-01-preview/SensitivityLabelsRecommendedUpdate.json
 */
async function updateRecommendedSensitivityLabelsOfAGivenDatabaseUsingAnOperationsBatch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.recommendedSensitivityLabels.update("myRG", "myServer", "myDatabase", {
    operations: [
      { schema: "dbo", column: "column1", op: "enable", table: "table1" },
      { schema: "dbo", column: "column2", op: "enable", table: "table2" },
      { schema: "dbo", column: "column3", op: "disable", table: "table1" },
    ],
  });
}

async function main(): Promise<void> {
  await updateRecommendedSensitivityLabelsOfAGivenDatabaseUsingAnOperationsBatch();
}

main().catch(console.error);
