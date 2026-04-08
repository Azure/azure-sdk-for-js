// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enables sensitivity recommendations on a given column (recommendations are enabled by default on all columns)
 *
 * @summary enables sensitivity recommendations on a given column (recommendations are enabled by default on all columns)
 * x-ms-original-file: 2025-02-01-preview/RecommendedColumnSensitivityLabelEnable.json
 */
async function enablesSensitivityRecommendationsOnAGivenColumn(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.sensitivityLabels.enableRecommendation(
    "myRG",
    "myServer",
    "myDatabase",
    "dbo",
    "myTable",
    "myColumn",
  );
}

async function main(): Promise<void> {
  await enablesSensitivityRecommendationsOnAGivenColumn();
}

main().catch(console.error);
