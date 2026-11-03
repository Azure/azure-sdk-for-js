// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels the specified build for an image definition.
 *
 * @summary cancels the specified build for an image definition.
 * x-ms-original-file: 2026-01-01-preview/DevCenterImageDefinitions_CancelImageBuild.json
 */
async function devCenterImageDefinitionBuildsCancelByImageDefinition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.devCenterCatalogImageDefinitionBuild.cancel(
    "rg1",
    "DevDevCenter",
    "CentralCatalog",
    "DefaultDevImage",
    "0a28fc61-6f87-4611-8fe2-32df44ab93b7",
  );
}

async function main(): Promise<void> {
  await devCenterImageDefinitionBuildsCancelByImageDefinition();
}

main().catch(console.error);
