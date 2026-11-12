// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of a SandboxGroup.
 *
 * @summary get the properties of a SandboxGroup.
 * x-ms-original-file: 2026-07-01/SandboxGroups_Get.json
 */
async function getASandboxGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.sandboxGroups.get("examplerg", "testgroup");
  console.log(result);
}

async function main(): Promise<void> {
  await getASandboxGroup();
}

main().catch(console.error);
