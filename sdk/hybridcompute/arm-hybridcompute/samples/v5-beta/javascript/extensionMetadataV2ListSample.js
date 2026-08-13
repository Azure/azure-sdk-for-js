// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all Extension versions based on location, publisher, extensionType
 *
 * @summary gets all Extension versions based on location, publisher, extensionType
 * x-ms-original-file: 2026-06-16-preview/extension/ExtensionMetadataV2_List.json
 */
async function getAListOfExtensionMetadata() {
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

async function main() {
  await getAListOfExtensionMetadata();
}

main().catch(console.error);
