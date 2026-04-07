// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disables sensitivity recommendations on a given column
 *
 * @summary disables sensitivity recommendations on a given column
 * x-ms-original-file: 2025-02-01-preview/RecommendedColumnSensitivityLabelDisable.json
 */
async function disablesSensitivityRecommendationsOnAGivenColumn(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.sensitivityLabels.disableRecommendation(
    "myRG",
    "myServer",
    "myDatabase",
    "dbo",
    "myTable",
    "myColumn",
    "recommended",
  );
}

async function main(): Promise<void> {
  await disablesSensitivityRecommendationsOnAGivenColumn();
}

main().catch(console.error);
