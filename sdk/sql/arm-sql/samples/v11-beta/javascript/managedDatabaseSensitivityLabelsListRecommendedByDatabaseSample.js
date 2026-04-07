// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the sensitivity labels of a given database
 *
 * @summary gets the sensitivity labels of a given database
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseSensitivityLabelsListByDatabaseRecommended.json
 */
async function getsTheRecommendedSensitivityLabelsOfAGivenDatabaseInAManagedDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseSensitivityLabels.listRecommendedByDatabase(
    "myRG",
    "myManagedInstanceName",
    "myDatabase",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheRecommendedSensitivityLabelsOfAGivenDatabaseInAManagedDatabase();
}

main().catch(console.error);
