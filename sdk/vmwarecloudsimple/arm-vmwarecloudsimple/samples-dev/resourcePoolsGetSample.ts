// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns resource pool templates by its name
 *
 * @summary Returns resource pool templates by its name
 * x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/GetResourcePool.json
 */

import { VMwareCloudSimple } from "@azure/arm-vmwarecloudsimple";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getResourcePool(): Promise<void> {
  const subscriptionId = process.env["VMWARECLOUDSIMPLE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const regionId = "westus2";
  const pcName = "myPrivateCloud";
  const resourcePoolName = "resgroup-26";
  const credential = new DefaultAzureCredential();
  const client = new VMwareCloudSimple(credential, subscriptionId);
  const result = await client.resourcePools.get(regionId, pcName, resourcePoolName);
  console.log(result);
}

async function main(): Promise<void> {
  await getResourcePool();
}

main().catch(console.error);
