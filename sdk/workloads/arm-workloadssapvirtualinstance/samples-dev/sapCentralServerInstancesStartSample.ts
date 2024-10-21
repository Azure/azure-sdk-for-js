// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts the SAP Central Services Instance.
 *
 * @summary starts the SAP Central Services Instance.
 * x-ms-original-file: 2024-09-01/SapCentralInstances_StartInstance.json
 */
async function startTheSapCentralServicesInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPCentralServerInstances.start(
    "test-rg",
    "X00",
    "centralServer",
    {},
  );
  console.log(result);
}

/**
 * This sample demonstrates how to starts the SAP Central Services Instance.
 *
 * @summary starts the SAP Central Services Instance.
 * x-ms-original-file: 2024-09-01/SapCentralInstances_StartInstanceVM.json
 */
async function startTheVirtualMachineSAndTheSapCentralServicesInstanceOnIt() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPCentralServerInstances.start("test-rg", "X00", "centralServer", {
    startVm: true,
  });
  console.log(result);
}

async function main() {
  startTheSapCentralServicesInstance();
  startTheVirtualMachineSAndTheSapCentralServicesInstanceOnIt();
}

main().catch(console.error);
