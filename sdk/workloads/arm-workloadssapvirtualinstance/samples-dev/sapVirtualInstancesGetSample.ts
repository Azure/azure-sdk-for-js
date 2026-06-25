// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Virtual Instance for SAP solutions resource
 *
 * @summary gets a Virtual Instance for SAP solutions resource
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_Get.json
 */
async function sapVirtualInstancesGet(): Promise<void> {
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
async function sapVirtualInstancesGetWithAcssInstallationBlocked(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapVirtualInstances.get("test-rg", "X00");
  console.log(result);
}

async function main(): Promise<void> {
  await sapVirtualInstancesGet();
  await sapVirtualInstancesGetWithAcssInstallationBlocked();
}

main().catch(console.error);
