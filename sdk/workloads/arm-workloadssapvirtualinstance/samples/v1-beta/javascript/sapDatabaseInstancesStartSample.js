// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadsClient } = require("@azure/arm-workloadssapvirtualinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts the database instance of the SAP system.
 *
 * @summary starts the database instance of the SAP system.
 * x-ms-original-file: 2024-09-01/SapDatabaseInstances_StartInstance.json
 */
async function startTheDatabaseInstanceOfTheSAPSystem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapDatabaseInstances.start("test-rg", "X00", "db0", { body: {} });
  console.log(result);
}

/**
 * This sample demonstrates how to starts the database instance of the SAP system.
 *
 * @summary starts the database instance of the SAP system.
 * x-ms-original-file: 2024-09-01/SapDatabaseInstances_StartInstanceVM.json
 */
async function startVirtualMachineAndTheDatabaseInstanceOfTheSAPSystemOnIt() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapDatabaseInstances.start("test-rg", "X00", "db0", {
    body: { startVm: true },
  });
  console.log(result);
}

async function main() {
  await startTheDatabaseInstanceOfTheSAPSystem();
  await startVirtualMachineAndTheDatabaseInstanceOfTheSAPSystemOnIt();
}

main().catch(console.error);
