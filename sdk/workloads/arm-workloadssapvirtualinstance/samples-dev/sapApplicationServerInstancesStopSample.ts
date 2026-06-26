// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops the SAP Application Server Instance.
 *
 * @summary stops the SAP Application Server Instance.
 * x-ms-original-file: 2024-09-01/SapApplicationServerInstances_StopInstance.json
 */
async function stopTheSAPApplicationServerInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapApplicationServerInstances.stop("test-rg", "X00", "app01", {
    body: { softStopTimeoutSeconds: 0 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to stops the SAP Application Server Instance.
 *
 * @summary stops the SAP Application Server Instance.
 * x-ms-original-file: 2024-09-01/SapApplicationServerInstances_StopInstanceInfrastructure.json
 */
async function stopTheSAPApplicationServerInstanceAndItInfrastructure(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapApplicationServerInstances.stop("test-rg", "X00", "app01", {
    body: { deallocateVm: true, softStopTimeoutSeconds: 0 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to stops the SAP Application Server Instance.
 *
 * @summary stops the SAP Application Server Instance.
 * x-ms-original-file: 2024-09-01/SapApplicationServerInstances_StopInstanceSoft.json
 */
async function softStopTheSAPApplicationServerInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapApplicationServerInstances.stop("test-rg", "X00", "app01", {
    body: { softStopTimeoutSeconds: 300 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to stops the SAP Application Server Instance.
 *
 * @summary stops the SAP Application Server Instance.
 * x-ms-original-file: 2024-09-01/SapApplicationServerInstances_StopInstanceSoftInfrastructure.json
 */
async function softStopTheSAPApplicationServerInstanceAndItInfrastructure(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapApplicationServerInstances.stop("test-rg", "X00", "app01", {
    body: { deallocateVm: true, softStopTimeoutSeconds: 300 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await stopTheSAPApplicationServerInstance();
  await stopTheSAPApplicationServerInstanceAndItInfrastructure();
  await softStopTheSAPApplicationServerInstance();
  await softStopTheSAPApplicationServerInstanceAndItInfrastructure();
}

main().catch(console.error);
