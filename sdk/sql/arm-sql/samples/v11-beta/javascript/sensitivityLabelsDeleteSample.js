// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the sensitivity label of a given column
 *
 * @summary deletes the sensitivity label of a given column
 * x-ms-original-file: 2025-02-01-preview/ColumnSensitivityLabelDelete.json
 */
async function deletesTheSensitivityLabelOfAGivenColumn() {
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

async function main() {
  await deletesTheSensitivityLabelOfAGivenColumn();
}

main().catch(console.error);
