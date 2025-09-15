// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the sensitivity label of a given column
 *
 * @summary Gets the sensitivity label of a given column
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/stable/2021-06-01/examples/GetSqlPoolColumnSensitivityLabelGet.json
 */

import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsTheSensitivityLabelOfAGivenColumn(): Promise<void> {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "myRG";
  const workspaceName = "myServer";
  const sqlPoolName = "myDatabase";
  const schemaName = "dbo";
  const tableName = "myTable";
  const columnName = "myColumn";
  const sensitivityLabelSource = "current";
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result = await client.sqlPoolSensitivityLabels.get(
    resourceGroupName,
    workspaceName,
    sqlPoolName,
    schemaName,
    tableName,
    columnName,
    sensitivityLabelSource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheSensitivityLabelOfAGivenColumn();
}

main().catch(console.error);
