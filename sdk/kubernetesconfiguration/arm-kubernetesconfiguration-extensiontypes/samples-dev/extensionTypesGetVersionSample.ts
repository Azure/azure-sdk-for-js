// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get details of a version for an extension type and location
 *
 * @summary Get details of a version for an extension type and location
 * x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensionTypes/preview/2024-11-01-preview/examples/GetExtensionTypeVersionByLocation.json
 */

import { ExtensionTypesClient } from "@azure/arm-kubernetesconfiguration-extensiontypes";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listExtensionTypeVersions(): Promise<void> {
  const subscriptionId =
    process.env["KUBERNETESCONFIGURATION_SUBSCRIPTION_ID"] || "subId1";
  const location = "westus";
  const extensionTypeName = "extensionType1";
  const versionNumber = "1.20.0";
  const credential = new DefaultAzureCredential();
  const client = new ExtensionTypesClient(credential, subscriptionId);
  const result = await client.extensionTypes.getVersion(
    location,
    extensionTypeName,
    versionNumber,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listExtensionTypeVersions();
}

main().catch(console.error);
