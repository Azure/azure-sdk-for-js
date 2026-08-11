// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an Extension Metadata based on location, publisher, extensionType and version
 *
 * @summary gets an Extension Metadata based on location, publisher, extensionType and version
 * x-ms-original-file: 2026-06-16-preview/extension/ExtensionMetadata_Get.json
 */
async function getAnExtensionsMetadata(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.extensionMetadata.get(
    "EastUS",
    "microsoft.azure.monitor",
    "azuremonitorlinuxagent",
    "1.9.1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnExtensionsMetadata();
}

main().catch(console.error);
