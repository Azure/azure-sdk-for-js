// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExtensionTypesClient } from "@azure/arm-kubernetesconfiguration-extensiontypes";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an extension type for the location.
 *
 * @summary get an extension type for the location.
 * x-ms-original-file: 2024-11-01-preview/GetExtensionTypeByLocation.json
 */
async function getExtensionType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionTypesClient(credential, subscriptionId);
  const result = await client.extensionTypes.locationGet("westus2", "extensionType1");
  console.log(result);
}

async function main(): Promise<void> {
  await getExtensionType();
}

main().catch(console.error);
