// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the sensitivity label of a given column
 *
 * @summary gets the sensitivity label of a given column
 * x-ms-original-file: 2025-02-01-preview/ColumnSensitivityLabelGet.json
 */
async function getsTheSensitivityLabelOfAGivenColumn(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.sensitivityLabels.get(
    "myRG",
    "myServer",
    "myDatabase",
    "dbo",
    "myTable",
    "myColumn",
    "current",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheSensitivityLabelOfAGivenColumn();
}

main().catch(console.error);
