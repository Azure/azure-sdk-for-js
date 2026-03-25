// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExtensionTypesClient } from "@azure/arm-kubernetesconfiguration-extensiontypes";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get details of a version for an extension type and location
 *
 * @summary get details of a version for an extension type and location
 * x-ms-original-file: 2024-11-01-preview/GetExtensionTypeVersionByLocation.json
 */
async function listExtensionTypeVersions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionTypesClient(credential, subscriptionId);
  const result = await client.extensionTypes.getVersion("westus", "extensionType1", "1.20.0");
  console.log(result);
}

async function main(): Promise<void> {
  await listExtensionTypeVersions();
}

main().catch(console.error);
