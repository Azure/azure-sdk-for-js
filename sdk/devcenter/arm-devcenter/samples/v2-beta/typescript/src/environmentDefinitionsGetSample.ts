// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an environment definition from the catalog.
 *
 * @summary gets an environment definition from the catalog.
 * x-ms-original-file: 2026-01-01-preview/EnvironmentDefinitions_Get.json
 */
async function environmentDefinitionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.environmentDefinitions.get(
    "rg1",
    "Contoso",
    "myCatalog",
    "myEnvironmentDefinition",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await environmentDefinitionsGet();
}

main().catch(console.error);
