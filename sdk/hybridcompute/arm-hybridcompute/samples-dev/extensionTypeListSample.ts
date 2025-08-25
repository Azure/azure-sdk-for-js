// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all Extension types based on location and publisher
 *
 * @summary Gets all Extension types based on location and publisher
 * x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/preview/2025-02-19-preview/examples/extension/ExtensionType_List.json
 */

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAListOfExtensionTypes(): Promise<void> {
  const location = "EastUS";
  const publisher = "microsoft.azure.monitor";
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.extensionTypeOperations.list(
    location,
    publisher,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfExtensionTypes();
}

main().catch(console.error);
