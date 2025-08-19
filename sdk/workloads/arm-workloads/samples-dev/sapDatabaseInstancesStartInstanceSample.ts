// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Starts the database instance of the SAP system.
 *
 * @summary Starts the database instance of the SAP system.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPDatabaseInstances_StartInstance.json
 */

import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function startTheDatabaseInstanceOfTheSapSystem(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const databaseInstanceName = "db0";
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPDatabaseInstances.beginStartInstanceAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    databaseInstanceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await startTheDatabaseInstanceOfTheSapSystem();
}

main().catch(console.error);
