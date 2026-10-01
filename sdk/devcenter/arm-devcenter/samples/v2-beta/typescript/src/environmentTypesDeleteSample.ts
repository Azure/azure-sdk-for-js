// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an environment type.
 *
 * @summary deletes an environment type.
 * x-ms-original-file: 2026-01-01-preview/EnvironmentTypes_Delete.json
 */
async function environmentTypesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.environmentTypes.delete("rg1", "Contoso", "DevTest");
}

async function main(): Promise<void> {
  await environmentTypesDelete();
}

main().catch(console.error);
