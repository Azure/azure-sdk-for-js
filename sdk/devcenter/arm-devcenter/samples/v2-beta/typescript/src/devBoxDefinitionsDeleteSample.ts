// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Dev Box definition.
 *
 * @summary deletes a Dev Box definition.
 * x-ms-original-file: 2026-01-01-preview/DevBoxDefinitions_Delete.json
 */
async function devBoxDefinitionsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.devBoxDefinitions.delete("rg1", "Contoso", "WebDevBox");
}

async function main(): Promise<void> {
  await devBoxDefinitionsDelete();
}

main().catch(console.error);
