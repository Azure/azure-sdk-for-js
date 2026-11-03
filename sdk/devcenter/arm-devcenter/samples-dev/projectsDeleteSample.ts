// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a project resource.
 *
 * @summary deletes a project resource.
 * x-ms-original-file: 2026-01-01-preview/Projects_Delete.json
 */
async function projectsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.projects.delete("rg1", "DevProject");
}

async function main(): Promise<void> {
  await projectsDelete();
}

main().catch(console.error);
