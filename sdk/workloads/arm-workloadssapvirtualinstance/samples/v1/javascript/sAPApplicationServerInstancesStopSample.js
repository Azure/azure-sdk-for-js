// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadsClient } = require("@azure/arm-workloadssapvirtualinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops the SAP Application Server Instance.
 *
 * @summary stops the SAP Application Server Instance.
 * x-ms-original-file: 2024-09-01/SapApplicationServerInstances_StopInstance.json
 */
async function stopTheSapApplicationServerInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPApplicationServerInstances.stop("test-rg", "X00", "app01", {
    softStopTimeoutSeconds: 0,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to stops the SAP Application Server Instance.
 *
 * @summary stops the SAP Application Server Instance.
 * x-ms-original-file: 2024-09-01/SapApplicationServerInstances_StopInstanceInfrastructure.json
 */
async function stopTheSapApplicationServerInstanceAndItInfrastructure() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPApplicationServerInstances.stop("test-rg", "X00", "app01", {
    deallocateVm: true,
    softStopTimeoutSeconds: 0,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to stops the SAP Application Server Instance.
 *
 * @summary stops the SAP Application Server Instance.
 * x-ms-original-file: 2024-09-01/SapApplicationServerInstances_StopInstanceSoft.json
 */
async function softStopTheSapApplicationServerInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPApplicationServerInstances.stop("test-rg", "X00", "app01", {
    softStopTimeoutSeconds: 300,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to stops the SAP Application Server Instance.
 *
 * @summary stops the SAP Application Server Instance.
 * x-ms-original-file: 2024-09-01/SapApplicationServerInstances_StopInstanceSoftInfrastructure.json
 */
async function softStopTheSapApplicationServerInstanceAndItInfrastructure() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPApplicationServerInstances.stop("test-rg", "X00", "app01", {
    deallocateVm: true,
    softStopTimeoutSeconds: 300,
  });
  console.log(result);
}

async function main() {
  stopTheSapApplicationServerInstance();
  stopTheSapApplicationServerInstanceAndItInfrastructure();
  softStopTheSapApplicationServerInstance();
  softStopTheSapApplicationServerInstanceAndItInfrastructure();
}

main().catch(console.error);
