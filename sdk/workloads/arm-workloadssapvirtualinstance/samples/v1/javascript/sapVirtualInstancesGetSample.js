// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadsClient } = require("@azure/arm-workloadssapvirtualinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Virtual Instance for SAP solutions resource
 *
 * @summary gets a Virtual Instance for SAP solutions resource
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_Get.json
 */
async function sapVirtualInstancesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapVirtualInstances.get("test-rg", "X00");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a Virtual Instance for SAP solutions resource
 *
 * @summary gets a Virtual Instance for SAP solutions resource
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_GetAcssInstallationBlocked.json
 */
async function sapVirtualInstancesGetWithAcssInstallationBlocked() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapVirtualInstances.get("test-rg", "X00");
  console.log(result);
}

async function main() {
  await sapVirtualInstancesGet();
  await sapVirtualInstancesGetWithAcssInstallationBlocked();
}

main().catch(console.error);
