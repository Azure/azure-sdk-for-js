// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops the database instance of the SAP system.
 *
 * @summary stops the database instance of the SAP system.
 * x-ms-original-file: 2024-09-01/SapDatabaseInstances_StopInstance.json
 */
async function stopTheDatabaseInstanceOfTheSAPSystem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapDatabaseInstances.stop("test-rg", "X00", "db0", {
    body: { softStopTimeoutSeconds: 0 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to stops the database instance of the SAP system.
 *
 * @summary stops the database instance of the SAP system.
 * x-ms-original-file: 2024-09-01/SapDatabaseInstances_StopInstanceSoft.json
 */
async function softStopTheDatabaseInstanceOfTheSAPSystem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapDatabaseInstances.stop("test-rg", "X00", "db0", {
    body: { softStopTimeoutSeconds: 300 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to stops the database instance of the SAP system.
 *
 * @summary stops the database instance of the SAP system.
 * x-ms-original-file: 2024-09-01/SapDatabaseInstances_StopInstanceSoftVM.json
 */
async function softStopTheDatabaseInstanceOfTheSAPSystemAndTheUnderlyingVirtualMachineS(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapDatabaseInstances.stop("test-rg", "X00", "db0", {
    body: { deallocateVm: true, softStopTimeoutSeconds: 300 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to stops the database instance of the SAP system.
 *
 * @summary stops the database instance of the SAP system.
 * x-ms-original-file: 2024-09-01/SapDatabaseInstances_StopInstanceVM.json
 */
async function stopTheDatabaseInstanceOfTheSAPSystemAndTheUnderlyingVirtualMachineS(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapDatabaseInstances.stop("test-rg", "X00", "db0", {
    body: { deallocateVm: true, softStopTimeoutSeconds: 0 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await stopTheDatabaseInstanceOfTheSAPSystem();
  await softStopTheDatabaseInstanceOfTheSAPSystem();
  await softStopTheDatabaseInstanceOfTheSAPSystemAndTheUnderlyingVirtualMachineS();
  await stopTheDatabaseInstanceOfTheSAPSystemAndTheUnderlyingVirtualMachineS();
}

main().catch(console.error);
