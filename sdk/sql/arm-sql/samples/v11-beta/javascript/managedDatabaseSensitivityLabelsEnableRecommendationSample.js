// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to enables sensitivity recommendations on a given column (recommendations are enabled by default on all columns)
 *
 * @summary enables sensitivity recommendations on a given column (recommendations are enabled by default on all columns)
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseRecommendedColumnSensitivityLabelEnable.json
 */
async function enablesTheSensitivityRecommendationsOnAGivenColumn() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedDatabaseSensitivityLabels.enableRecommendation(
    "myRG",
    "myManagedInstanceName",
    "myDatabase",
    "dbo",
    "myTable",
    "myColumn",
    "recommended",
  );
}

async function main() {
  await enablesTheSensitivityRecommendationsOnAGivenColumn();
}

main().catch(console.error);
