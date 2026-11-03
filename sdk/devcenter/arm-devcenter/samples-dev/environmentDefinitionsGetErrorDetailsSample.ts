// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets Environment Definition error details.
 *
 * @summary gets Environment Definition error details.
 * x-ms-original-file: 2026-01-01-preview/EnvironmentDefinitions_GetErrorDetails.json
 */
async function environmentDefinitionsGetErrorDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.environmentDefinitions.getErrorDetails(
    "rg1",
    "Contoso",
    "myCatalog",
    "myEnvironmentDefinition",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await environmentDefinitionsGetErrorDetails();
}

main().catch(console.error);
