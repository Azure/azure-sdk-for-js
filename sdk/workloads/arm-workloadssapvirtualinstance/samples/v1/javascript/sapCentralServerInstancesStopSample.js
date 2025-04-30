// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadsClient } = require("@azure/arm-workloadssapvirtualinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops the SAP Central Services Instance.
 *
 * @summary stops the SAP Central Services Instance.
 * x-ms-original-file: 2024-09-01/SapCentralInstances_StopInstance.json
 */
async function stopTheSAPCentralServicesInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapCentralServerInstances.stop("test-rg", "X00", "centralServer", {
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
async function stopTheSAPCentralServicesInstanceAndItsUnderlyingVirtualMachineS() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapCentralServerInstances.stop("test-rg", "X00", "centralServer", {
    body: { deallocateVm: true },
  });
  console.log(result);
}

async function main() {
  await stopTheSAPCentralServicesInstance();
  await stopTheSAPCentralServicesInstanceAndItsUnderlyingVirtualMachineS();
}

main().catch(console.error);
