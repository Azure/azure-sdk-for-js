// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns list of private clouds in particular region
 *
 * @summary Returns list of private clouds in particular region
 * x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/ListPrivateCloudInLocation.json
 */

import { VMwareCloudSimple } from "@azure/arm-vmwarecloudsimple";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listPrivateCloudInLocation(): Promise<void> {
  const subscriptionId = process.env["VMWARECLOUDSIMPLE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const regionId = "eastus";
  const credential = new DefaultAzureCredential();
  const client = new VMwareCloudSimple(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateClouds.list(regionId)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listPrivateCloudInLocation();
}

main().catch(console.error);
