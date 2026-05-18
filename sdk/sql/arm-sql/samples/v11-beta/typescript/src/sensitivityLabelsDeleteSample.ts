// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the sensitivity label of a given column
 *
 * @summary deletes the sensitivity label of a given column
 * x-ms-original-file: 2025-02-01-preview/ColumnSensitivityLabelDelete.json
 */
async function deletesTheSensitivityLabelOfAGivenColumn(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.sensitivityLabels.delete(
    "myRG",
    "myServer",
    "myDatabase",
    "dbo",
    "myTable",
    "myColumn",
  );
}

async function main(): Promise<void> {
  await deletesTheSensitivityLabelOfAGivenColumn();
}

main().catch(console.error);
