// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get an extension type for the location.
 *
 * @summary Get an extension type for the location.
 * x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensionTypes/preview/2024-11-01-preview/examples/GetExtensionTypeByLocation.json
 */

import { ExtensionTypesClient } from "@azure/arm-kubernetesconfiguration-extensiontypes";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getExtensionType(): Promise<void> {
  const subscriptionId =
    process.env["KUBERNETESCONFIGURATION_SUBSCRIPTION_ID"] || "subId1";
  const location = "westus2";
  const extensionTypeName = "extensionType1";
  const credential = new DefaultAzureCredential();
  const client = new ExtensionTypesClient(credential, subscriptionId);
  const result = await client.extensionTypes.locationGet(
    location,
    extensionTypeName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getExtensionType();
}

main().catch(console.error);
