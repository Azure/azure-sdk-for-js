// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all Extension versions based on location, publisher, extensionType
 *
 * @summary gets all Extension versions based on location, publisher, extensionType
 * x-ms-original-file: 2025-09-16-preview/extension/ExtensionMetadataV2_List.json
 */
async function getAListOfExtensionMetadata(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.extensionMetadataV2.list(
    "EastUS",
    "microsoft.azure.monitor",
    "azuremonitorlinuxagent",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfExtensionMetadata();
}

main().catch(console.error);
