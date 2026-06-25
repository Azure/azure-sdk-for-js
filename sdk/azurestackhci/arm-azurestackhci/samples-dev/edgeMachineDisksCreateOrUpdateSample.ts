// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a disk on an Edge Machine.
 *
 * @summary create or update a disk on an Edge Machine.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineDisks_CreateOrUpdate.json
 */
async function edgeMachineDisksCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineDisks.createOrUpdate(
    "test-rg",
    "EdgeMachine01",
    "disk-001",
    {
      properties: {
        diskConfiguration: {
          volumes: [{ sizeInBytes: "107374182400", path: "/data", fileSystem: "ext4" }],
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachineDisksCreateOrUpdate();
}

main().catch(console.error);
