// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImageBuilderClient } from "@azure/arm-imagebuilder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about the VM image templates associated with the subscription.
 *
 * @summary gets information about the VM image templates associated with the subscription.
 * x-ms-original-file: 2025-10-01/ListImageTemplates.json
 */
async function listImagesBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
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
