// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to replace the provided bare metal machine.
 *
 * @summary replace the provided bare metal machine.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachines_Replace.json
 */
async function replaceBareMetalMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.bareMetalMachines.replace(
    "resourceGroupName",
    "bareMetalMachineName",
    {
      bareMetalMachineReplaceParameters: {
        bmcCredentials: {
          password: "https://keyvaultname.vault.azure.net/secrets/secretName",
          username: "bmcuser",
        },
        bmcMacAddress: "00:00:4f:00:57:ad",
        bootMacAddress: "00:00:4e:00:58:af",
        machineName: "name",
        safeguardMode: "All",
        serialNumber: "BM1219XXX",
        storagePolicy: "DiscardAll",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await replaceBareMetalMachine();
}

main().catch(console.error);
