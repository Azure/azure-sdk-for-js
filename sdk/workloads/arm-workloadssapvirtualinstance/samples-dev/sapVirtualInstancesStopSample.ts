// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops the SAP Application, that is the Application server instances and Central Services instance.
 *
 * @summary stops the SAP Application, that is the Application server instances and Central Services instance.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_SoftStop.json
 */
async function softStopOfSapVirtualInstancesStop(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapVirtualInstances.stop("test-rg", "X00", {
    body: { softStopTimeoutSeconds: 300 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to stops the SAP Application, that is the Application server instances and Central Services instance.
 *
 * @summary stops the SAP Application, that is the Application server instances and Central Services instance.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_SoftStopVMAndSystem.json
 */
async function softStopTheVirtualMachineSAndTheSAPSystemOnIt(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapVirtualInstances.stop("test-rg", "X00", {
    body: { deallocateVm: true, softStopTimeoutSeconds: 300 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to stops the SAP Application, that is the Application server instances and Central Services instance.
 *
 * @summary stops the SAP Application, that is the Application server instances and Central Services instance.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_Stop.json
 */
async function sapVirtualInstancesStop(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapVirtualInstances.stop("test-rg", "X00", {
    body: { softStopTimeoutSeconds: 0 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to stops the SAP Application, that is the Application server instances and Central Services instance.
 *
 * @summary stops the SAP Application, that is the Application server instances and Central Services instance.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_StopVMAndSystem.json
 */
async function stopTheVirtualMachineSAndTheSAPSystemOnIt(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapVirtualInstances.stop("test-rg", "X00", {
    body: { deallocateVm: true, softStopTimeoutSeconds: 0 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await softStopOfSapVirtualInstancesStop();
  await softStopTheVirtualMachineSAndTheSAPSystemOnIt();
  await sapVirtualInstancesStop();
  await stopTheVirtualMachineSAndTheSAPSystemOnIt();
}

main().catch(console.error);
