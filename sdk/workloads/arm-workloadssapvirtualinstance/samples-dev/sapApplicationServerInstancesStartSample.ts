// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts the SAP Application Server Instance.
 *
 * @summary starts the SAP Application Server Instance.
 * x-ms-original-file: 2024-09-01/SapApplicationServerInstances_StartInstance.json
 */
async function startTheSAPApplicationServerInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapApplicationServerInstances.start("test-rg", "X00", "app01", {
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
async function startVirtualMachineAndTheSAPApplicationServerInstanceOnIt(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapApplicationServerInstances.start("test-rg", "X00", "app01", {
    body: { startVm: true },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await startTheSAPApplicationServerInstance();
  await startVirtualMachineAndTheSAPApplicationServerInstanceOnIt();
}

main().catch(console.error);
