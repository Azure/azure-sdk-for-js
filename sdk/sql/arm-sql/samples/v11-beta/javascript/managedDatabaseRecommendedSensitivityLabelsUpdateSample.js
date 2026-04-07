// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update recommended sensitivity labels states of a given database using an operations batch.
 *
 * @summary update recommended sensitivity labels states of a given database using an operations batch.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseSensitivityLabelsRecommendedUpdate.json
 */
async function updateRecommendedSensitivityLabelsOfAGivenDatabaseUsingAnOperationsBatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedDatabaseRecommendedSensitivityLabels.update(
    "myRG",
    "myManagedInstanceName",
    "myDatabase",
    {
      operations: [
        { schema: "dbo", column: "column1", op: "enable", table: "table1" },
        { schema: "dbo", column: "column2", op: "disable", table: "table2" },
        { schema: "dbo", column: "Column3", op: "disable", table: "Table1" },
      ],
    },
  );
}

async function main() {
  await updateRecommendedSensitivityLabelsOfAGivenDatabaseUsingAnOperationsBatch();
}

main().catch(console.error);
