// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all Extension types based on location and publisher
 *
 * @summary gets all Extension types based on location and publisher
 * x-ms-original-file: 2025-09-16-preview/extension/ExtensionType_List.json
 */
async function getAListOfExtensionTypes() {
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.extensionType.list("EastUS", "microsoft.azure.monitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAListOfExtensionTypes();
}

main().catch(console.error);
