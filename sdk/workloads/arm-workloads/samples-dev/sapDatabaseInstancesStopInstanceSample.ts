// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  StopRequest,
  SAPDatabaseInstancesStopInstanceOptionalParams,
} from "@azure/arm-workloads";
import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Stops the database instance of the SAP system.
 *
 * @summary Stops the database instance of the SAP system.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPDatabaseInstances_StopInstance.json
 */
async function stopTheDatabaseInstanceOfTheSapSystem(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const databaseInstanceName = "db0";
  const body: StopRequest = { softStopTimeoutSeconds: 0 };
  const options: SAPDatabaseInstancesStopInstanceOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPDatabaseInstances.beginStopInstanceAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    databaseInstanceName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await stopTheDatabaseInstanceOfTheSapSystem();
}

main().catch(console.error);
