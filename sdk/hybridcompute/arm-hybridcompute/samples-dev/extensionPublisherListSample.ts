// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all Extension publishers based on the location
 *
 * @summary gets all Extension publishers based on the location
 * x-ms-original-file: 2025-09-16-preview/extension/ExtensionPublisher_List.json
 */
async function getAListOfExtensionPublishers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.extensionPublisher.list("EastUS")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfExtensionPublishers();
}

main().catch(console.error);
