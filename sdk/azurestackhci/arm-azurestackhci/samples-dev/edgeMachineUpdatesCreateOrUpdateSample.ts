// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update EdgeMachine update.
 *
 * @summary create or update EdgeMachine update.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineUpdates_CreateOrUpdate.json
 */
async function edgeMachineUpdatesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineUpdates.createOrUpdate(
    "ArcInstance-rg",
    "machine1",
    "default",
    {
      properties: {
        solutionType: "AzureLinux",
        values: [
          {
            vsrVersion: "1.2.0",
            displayName: "May 2026 Cumulative Update",
            releaseNotesLink: "https://aka.ms/azurestackhci/releasenotes/2026-05",
            totalSizeBytes: 5368709120,
            rebootRequired: true,
            estimatedInstallTimeMinutes: 45,
            updateType: "FullImage",
            arcAgentVersion: "1.45.02664",
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachineUpdatesCreateOrUpdate();
}

main().catch(console.error);
