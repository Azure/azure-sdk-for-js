// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the sensitivity label of a given column
 *
 * @summary creates or updates the sensitivity label of a given column
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseColumnSensitivityLabelCreate.json
 */
async function updatesOrCreatesASensitivityLabelOfAGivenColumnWithAllParametersInAManagedDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedDatabaseSensitivityLabels.createOrUpdate(
    "myRG",
    "myManagedInstanceName",
    "myDatabase",
    "dbo",
    "myTable",
    "myColumn",
    "current",
    {
      clientClassificationSource: "Native",
      informationType: "PhoneNumber",
      informationTypeId: "d22fa6e9-5ee4-3bde-4c2b-a409604c4646",
      labelId: "bf91e08c-f4f0-478a-b016-25164b2a65ff",
      labelName: "PII",
      rank: "High",
    },
  );
  console.log(result);
}

async function main() {
  await updatesOrCreatesASensitivityLabelOfAGivenColumnWithAllParametersInAManagedDatabase();
}

main().catch(console.error);
