// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the sensitivity labels of a given database
 *
 * @summary gets the sensitivity labels of a given database
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseSensitivityLabelsListByDatabase.json
 */
async function getsTheCurrentAndRecommendedSensitivityLabelsOfAGivenDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseSensitivityLabels.listByDatabase(
    "myRG",
    "myManagedInstanceName",
    "myDatabase",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheCurrentAndRecommendedSensitivityLabelsOfAGivenDatabase();
}

main().catch(console.error);
