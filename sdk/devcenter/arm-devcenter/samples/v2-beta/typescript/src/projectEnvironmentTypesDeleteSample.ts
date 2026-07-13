// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a project environment type.
 *
 * @summary deletes a project environment type.
 * x-ms-original-file: 2026-01-01-preview/ProjectEnvironmentTypes_Delete.json
 */
async function projectEnvironmentTypesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.projectEnvironmentTypes.delete("rg1", "ContosoProj", "DevTest");
}

async function main(): Promise<void> {
  await projectEnvironmentTypesDelete();
}

main().catch(console.error);
