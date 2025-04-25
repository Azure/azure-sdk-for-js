// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadsClient } = require("@azure/arm-workloadssapvirtualinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts the SAP Central Services Instance.
 *
 * @summary starts the SAP Central Services Instance.
 * x-ms-original-file: 2024-09-01/SapCentralInstances_StartInstance.json
 */
async function startTheSAPCentralServicesInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapCentralServerInstances.start("test-rg", "X00", "centralServer", {
    body: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to starts the SAP Central Services Instance.
 *
 * @summary starts the SAP Central Services Instance.
 * x-ms-original-file: 2024-09-01/SapCentralInstances_StartInstanceVM.json
 */
async function startTheVirtualMachineSAndTheSAPCentralServicesInstanceOnIt() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapCentralServerInstances.start("test-rg", "X00", "centralServer", {
    body: { startVm: true },
  });
  console.log(result);
}

async function main() {
  await startTheSAPCentralServicesInstance();
  await startTheVirtualMachineSAndTheSAPCentralServicesInstanceOnIt();
}

main().catch(console.error);
