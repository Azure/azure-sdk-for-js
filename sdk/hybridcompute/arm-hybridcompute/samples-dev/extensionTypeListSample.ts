// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all Extension types based on location and publisher
 *
 * @summary gets all Extension types based on location and publisher
 * x-ms-original-file: 2026-06-16-preview/extension/ExtensionType_List.json
 */
async function getAListOfExtensionTypes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.extensionType.list("EastUS", "microsoft.azure.monitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfExtensionTypes();
}

main().catch(console.error);
