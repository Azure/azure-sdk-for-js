// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets applicable inherited settings for this project.
 *
 * @summary gets applicable inherited settings for this project.
 * x-ms-original-file: 2026-01-01-preview/Projects_GetInheritedSettings.json
 */
async function projectsGetInheritedSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projects.getInheritedSettings("rg1", "Contoso");
  console.log(result);
}

async function main(): Promise<void> {
  await projectsGetInheritedSettings();
}

main().catch(console.error);
