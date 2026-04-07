// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disables sensitivity recommendations on a given column
 *
 * @summary disables sensitivity recommendations on a given column
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseRecommendedColumnSensitivityLabelDisable.json
 */
async function disablesTheSensitivityRecommendationsOnAGivenColumn(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedDatabaseSensitivityLabels.disableRecommendation(
    "myRG",
    "myManagedInstanceName",
    "myDatabase",
    "dbo",
    "myTable",
    "myColumn",
    "recommended",
  );
}

async function main(): Promise<void> {
  await disablesTheSensitivityRecommendationsOnAGivenColumn();
}

main().catch(console.error);
