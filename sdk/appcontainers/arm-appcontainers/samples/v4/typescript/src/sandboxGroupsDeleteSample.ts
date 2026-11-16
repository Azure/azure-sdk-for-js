// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a SandboxGroup.
 *
 * @summary delete a SandboxGroup.
 * x-ms-original-file: 2026-07-01/SandboxGroups_Delete.json
 */
async function deleteASandboxGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.sandboxGroups.delete("examplerg", "testgroup");
}

async function main(): Promise<void> {
  await deleteASandboxGroup();
}

main().catch(console.error);
