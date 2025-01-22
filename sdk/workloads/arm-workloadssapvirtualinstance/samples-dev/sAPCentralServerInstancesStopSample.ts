// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops the SAP Central Services Instance.
 *
 * @summary stops the SAP Central Services Instance.
 * x-ms-original-file: 2024-09-01/SapCentralInstances_StopInstance.json
 */
async function stopTheSapCentralServicesInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPCentralServerInstances.stop("test-rg", "X00", "centralServer", {
    body: { softStopTimeoutSeconds: 1200 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to stops the SAP Central Services Instance.
 *
 * @summary stops the SAP Central Services Instance.
 * x-ms-original-file: 2024-09-01/SapCentralInstances_StopInstanceVM.json
 */
async function stopTheSapCentralServicesInstanceAndItsUnderlyingVirtualMachineS() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPCentralServerInstances.stop("test-rg", "X00", "centralServer", {
    body: { deallocateVm: true },
  });
  console.log(result);
}

async function main() {
  await stopTheSapCentralServicesInstance();
  await stopTheSapCentralServicesInstanceAndItsUnderlyingVirtualMachineS();
}

main().catch(console.error);
