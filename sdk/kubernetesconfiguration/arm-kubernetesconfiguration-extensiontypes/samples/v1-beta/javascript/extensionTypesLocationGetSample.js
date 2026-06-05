// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ExtensionTypesClient } = require("@azure/arm-kubernetesconfiguration-extensiontypes");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an extension type for the location.
 *
 * @summary get an extension type for the location.
 * x-ms-original-file: 2024-11-01-preview/GetExtensionTypeByLocation.json
 */
async function getExtensionType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionTypesClient(credential, subscriptionId);
  const result = await client.extensionTypes.locationGet("westus2", "extensionType1");
  console.log(result);
}

async function main() {
  await getExtensionType();
}

main().catch(console.error);
