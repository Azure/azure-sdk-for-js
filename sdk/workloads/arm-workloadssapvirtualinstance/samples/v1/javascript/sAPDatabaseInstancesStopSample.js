// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadsClient } = require("@azure/arm-workloadssapvirtualinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops the database instance of the SAP system.
 *
 * @summary stops the database instance of the SAP system.
 * x-ms-original-file: 2024-09-01/SapDatabaseInstances_StopInstance.json
 */
async function stopTheDatabaseInstanceOfTheSapSystem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPDatabaseInstances.stop("test-rg", "X00", "db0", {
    softStopTimeoutSeconds: 0,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to stops the database instance of the SAP system.
 *
 * @summary stops the database instance of the SAP system.
 * x-ms-original-file: 2024-09-01/SapDatabaseInstances_StopInstanceSoft.json
 */
async function softStopTheDatabaseInstanceOfTheSapSystem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPDatabaseInstances.stop("test-rg", "X00", "db0", {
    softStopTimeoutSeconds: 300,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to stops the database instance of the SAP system.
 *
 * @summary stops the database instance of the SAP system.
 * x-ms-original-file: 2024-09-01/SapDatabaseInstances_StopInstanceSoftVM.json
 */
async function softStopTheDatabaseInstanceOfTheSapSystemAndTheUnderlyingVirtualMachineS() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPDatabaseInstances.stop("test-rg", "X00", "db0", {
    deallocateVm: true,
    softStopTimeoutSeconds: 300,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to stops the database instance of the SAP system.
 *
 * @summary stops the database instance of the SAP system.
 * x-ms-original-file: 2024-09-01/SapDatabaseInstances_StopInstanceVM.json
 */
async function stopTheDatabaseInstanceOfTheSapSystemAndTheUnderlyingVirtualMachineS() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPDatabaseInstances.stop("test-rg", "X00", "db0", {
    deallocateVm: true,
    softStopTimeoutSeconds: 0,
  });
  console.log(result);
}

async function main() {
  stopTheDatabaseInstanceOfTheSapSystem();
  softStopTheDatabaseInstanceOfTheSapSystem();
  softStopTheDatabaseInstanceOfTheSapSystemAndTheUnderlyingVirtualMachineS();
  stopTheDatabaseInstanceOfTheSapSystemAndTheUnderlyingVirtualMachineS();
}

main().catch(console.error);
