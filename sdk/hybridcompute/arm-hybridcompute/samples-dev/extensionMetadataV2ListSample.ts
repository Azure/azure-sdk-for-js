// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all Extension versions based on location, publisher, extensionType
 *
 * @summary Gets all Extension versions based on location, publisher, extensionType
 * x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/preview/2025-02-19-preview/examples/extension/ExtensionMetadataV2_List.json
 */

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAListOfExtensionMetadata(): Promise<void> {
  const location = "EastUS";
  const publisher = "microsoft.azure.monitor";
  const extensionType = "azuremonitorlinuxagent";
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.extensionMetadataV2.list(
    location,
    publisher,
    extensionType,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfExtensionMetadata();
}

main().catch(console.error);
