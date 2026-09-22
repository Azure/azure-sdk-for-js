// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImageBuilderClient } from "@azure/arm-imagebuilder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified trigger for the specified image template resource
 *
 * @summary get the specified trigger for the specified image template resource
 * x-ms-original-file: 2025-10-01/GetTrigger.json
 */
async function getATriggerResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  const result = await client.triggers.get("myResourceGroup", "myImageTemplate", "source");
  console.log(result);
}

async function main(): Promise<void> {
  await getATriggerResource();
}

main().catch(console.error);
