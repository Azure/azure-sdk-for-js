// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Virtual Instance for SAP solutions resource and its child resources, that is the associated Central Services Instance, Application Server Instances and Database Instance.
 *
 * @summary deletes a Virtual Instance for SAP solutions resource and its child resources, that is the associated Central Services Instance, Application Server Instances and Database Instance.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_Delete.json
 */
async function sapVirtualInstancesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  await client.sapVirtualInstances.delete("test-rg", "X00");
}

async function main(): Promise<void> {
  await sapVirtualInstancesDelete();
}

main().catch(console.error);
