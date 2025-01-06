// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadsClient } = require("@azure/arm-workloadssapvirtualinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts the SAP Application Server Instance.
 *
 * @summary starts the SAP Application Server Instance.
 * x-ms-original-file: 2024-09-01/SapApplicationServerInstances_StartInstance.json
 */
async function startTheSapApplicationServerInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPApplicationServerInstances.start("test-rg", "X00", "app01", {
    body: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to starts the SAP Application Server Instance.
 *
 * @summary starts the SAP Application Server Instance.
 * x-ms-original-file: 2024-09-01/SapApplicationServerInstances_StartInstanceVM.json
 */
async function startVirtualMachineAndTheSapApplicationServerInstanceOnIt() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPApplicationServerInstances.start("test-rg", "X00", "app01", {
    body: { startVm: true },
  });
  console.log(result);
}

async function main() {
  startTheSapApplicationServerInstance();
  startVirtualMachineAndTheSapApplicationServerInstanceOnIt();
}

main().catch(console.error);
