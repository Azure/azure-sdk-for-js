// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets Image Definition error details.
 *
 * @summary gets Image Definition error details.
 * x-ms-original-file: 2026-01-01-preview/DevCenterImageDefinitions_GetErrorDetails.json
 */
async function devCenterImageDefinitionsGetErrorDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.devCenterCatalogImageDefinitions.getErrorDetails(
    "rg1",
    "DevDevCenter",
    "TeamCatalog",
    "WebDevBox",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await devCenterImageDefinitionsGetErrorDetails();
}

main().catch(console.error);
