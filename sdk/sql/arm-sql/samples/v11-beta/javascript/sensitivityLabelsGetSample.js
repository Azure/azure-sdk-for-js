// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the sensitivity label of a given column
 *
 * @summary gets the sensitivity label of a given column
 * x-ms-original-file: 2025-02-01-preview/ColumnSensitivityLabelGet.json
 */
async function getsTheSensitivityLabelOfAGivenColumn() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
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

async function main() {
  await getsTheSensitivityLabelOfAGivenColumn();
}

main().catch(console.error);
