// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ExtensionTypesClient } = require("@azure/arm-kubernetesconfiguration-extensiontypes");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get details of a version for an extension type and location
 *
 * @summary get details of a version for an extension type and location
 * x-ms-original-file: 2024-11-01-preview/GetExtensionTypeVersionByLocation.json
 */
async function listExtensionTypeVersions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionTypesClient(credential, subscriptionId);
  const result = await client.extensionTypes.getVersion("westus", "extensionType1", "1.20.0");
  console.log(result);
}

async function main() {
  await listExtensionTypeVersions();
}

main().catch(console.error);
