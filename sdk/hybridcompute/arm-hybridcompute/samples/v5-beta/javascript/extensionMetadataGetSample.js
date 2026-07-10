// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an Extension Metadata based on location, publisher, extensionType and version
 *
 * @summary gets an Extension Metadata based on location, publisher, extensionType and version
 * x-ms-original-file: 2025-09-16-preview/extension/ExtensionMetadata_Get.json
 */
async function getAnExtensionsMetadata() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.extensionMetadata.get(
    "EastUS",
    "microsoft.azure.monitor",
    "azuremonitorlinuxagent",
    "1.9.1",
  );
  console.log(result);
}

async function main() {
  await getAnExtensionsMetadata();
}

main().catch(console.error);
