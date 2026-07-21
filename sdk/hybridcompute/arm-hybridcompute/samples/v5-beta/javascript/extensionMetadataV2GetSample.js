// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an Extension Metadata based on location, publisher, extensionType and version
 *
 * @summary gets an Extension Metadata based on location, publisher, extensionType and version
 * x-ms-original-file: 2025-09-16-preview/extension/ExtensionMetadataV2_Get.json
 */
async function getAnExtensionMetadata() {
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential);
  const result = await client.extensionMetadataV2.get(
    "EastUS",
    "microsoft.azure.monitor",
    "azuremonitorlinuxagent",
    "1.33.0",
  );
  console.log(result);
}

async function main() {
  await getAnExtensionMetadata();
}

main().catch(console.error);
