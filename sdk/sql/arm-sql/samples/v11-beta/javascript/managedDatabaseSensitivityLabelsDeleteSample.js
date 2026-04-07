// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the sensitivity label of a given column
 *
 * @summary deletes the sensitivity label of a given column
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseColumnSensitivityLabelDelete.json
 */
async function deletesTheSensitivityLabelOfAGivenColumnInAManagedDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedDatabaseSensitivityLabels.delete(
    "myRG",
    "myManagedInstanceName",
    "myDatabase",
    "dbo",
    "myTable",
    "myColumn",
    "current",
  );
}

async function main() {
  await deletesTheSensitivityLabelOfAGivenColumnInAManagedDatabase();
}

main().catch(console.error);
