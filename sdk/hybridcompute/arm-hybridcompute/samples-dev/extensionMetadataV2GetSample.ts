// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets an Extension Metadata based on location, publisher, extensionType and version
 *
 * @summary Gets an Extension Metadata based on location, publisher, extensionType and version
 * x-ms-original-file: specification/hybridcompute/resource-manager/Microsoft.HybridCompute/preview/2025-02-19-preview/examples/extension/ExtensionMetadataV2_Get.json
 */

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAnExtensionMetadata(): Promise<void> {
  const location = "EastUS";
  const publisher = "microsoft.azure.monitor";
  const extensionType = "azuremonitorlinuxagent";
  const version = "1.33.0";
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential);
  const result = await client.extensionMetadataV2.get(
    location,
    publisher,
    extensionType,
    version,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnExtensionMetadata();
}

main().catch(console.error);
