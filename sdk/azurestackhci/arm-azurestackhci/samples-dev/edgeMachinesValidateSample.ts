// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a long-running resource action to validate the edge machine.
 *
 * @summary a long-running resource action to validate the edge machine.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachines_Validate.json
 */
async function edgeMachinesValidate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachines.validate("ArcInstance-rg", "machine-1", {
    edgeMachineIds: [
      "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.AzureStackHCI/edgeMachines/machine-2",
      "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.AzureStackHCI/edgeMachines/machine-3",
    ],
    additionalInfo: "Validate before cluster creation",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachinesValidate();
}

main().catch(console.error);
