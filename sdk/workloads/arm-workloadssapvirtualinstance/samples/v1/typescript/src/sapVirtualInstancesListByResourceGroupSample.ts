// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all Virtual Instances for SAP solutions resources in a Resource Group.
 *
 * @summary gets all Virtual Instances for SAP solutions resources in a Resource Group.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_ListByResourceGroup.json
 */
async function sapVirtualInstancesListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sapVirtualInstances.listByResourceGroup("test-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await sapVirtualInstancesListByResourceGroup();
}

main().catch(console.error);
