// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all Extension versions based on location, publisher, extensionType
 *
 * @summary gets all Extension versions based on location, publisher, extensionType
 * x-ms-original-file: 2026-06-16-preview/extension/ExtensionMetadata_List.json
 */
async function getAListOfExtensions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.extensionMetadata.list(
    "EastUS",
    "microsoft.azure.monitor",
    "azuremonitorlinuxagent",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAListOfExtensions();
}

main().catch(console.error);
