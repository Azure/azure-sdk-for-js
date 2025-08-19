// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns list virtual machine within subscription
 *
 * @summary Returns list virtual machine within subscription
 * x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/ListVirtualMachines.json
 */

import { VMwareCloudSimple } from "@azure/arm-vmwarecloudsimple";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listVirtualMachines(): Promise<void> {
  const subscriptionId = process.env["VMWARECLOUDSIMPLE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const credential = new DefaultAzureCredential();
  const client = new VMwareCloudSimple(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachines.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listVirtualMachines();
}

main().catch(console.error);
