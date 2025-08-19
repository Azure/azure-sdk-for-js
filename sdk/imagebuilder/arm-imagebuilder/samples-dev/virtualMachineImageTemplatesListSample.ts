// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets information about the VM image templates associated with the subscription.
 *
 * @summary Gets information about the VM image templates associated with the subscription.
 * x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2024-02-01/examples/ListImageTemplates.json
 */

import { ImageBuilderClient } from "@azure/arm-imagebuilder";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listImagesBySubscription(): Promise<void> {
  const subscriptionId = process.env["IMAGEBUILDER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const credential = new DefaultAzureCredential();
  const client = new ImageBuilderClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineImageTemplates.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listImagesBySubscription();
}

main().catch(console.error);
