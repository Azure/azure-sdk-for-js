// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch properties of the provided bare metal machine, or update tags associated with the bare metal machine. Properties and tag updates can be done independently.
 *
 * @summary patch properties of the provided bare metal machine, or update tags associated with the bare metal machine. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachines_Patch.json
 */
async function patchBareMetalMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.bareMetalMachines.update(
    "resourceGroupName",
    "bareMetalMachineName",
    {
      bareMetalMachineUpdateParameters: {
        machineDetails: "machinedetails",
        tags: { key1: "myvalue1", key2: "myvalue2" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await patchBareMetalMachine();
}

main().catch(console.error);
