// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update sensitivity labels of a given database using an operations batch.
 *
 * @summary update sensitivity labels of a given database using an operations batch.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseSensitivityLabelsCurrentUpdate.json
 */
async function updateSensitivityLabelsOfAGivenDatabaseUsingAnOperationsBatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedDatabaseSensitivityLabels.update(
    "myRG",
    "myManagedInstanceName",
    "myDatabase",
    {
      operations: [
        {
          schema: "dbo",
          column: "column1",
          op: "set",
          sensitivityLabel: {
            informationType: "Financial",
            informationTypeId: "1D3652D6-422C-4115-82F1-65DAEBC665C8",
            labelId: "3A477B16-9423-432B-AA97-6069B481CEC3",
            labelName: "Highly Confidential",
          },
          table: "table1",
        },
        {
          schema: "dbo",
          column: "column2",
          op: "set",
          sensitivityLabel: {
            informationType: "PhoneNumber",
            informationTypeId: "d22fa6e9-5ee4-3bde-4c2b-a409604c4646",
            labelId: "bf91e08c-f4f0-478a-b016-25164b2a65ff",
            labelName: "PII",
          },
          table: "table2",
        },
        { schema: "dbo", column: "Column3", op: "remove", table: "Table1" },
      ],
    },
  );
}

async function main() {
  await updateSensitivityLabelsOfAGivenDatabaseUsingAnOperationsBatch();
}

main().catch(console.error);
