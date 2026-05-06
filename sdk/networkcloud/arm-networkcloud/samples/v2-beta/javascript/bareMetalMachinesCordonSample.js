// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cordon the provided bare metal machine's Kubernetes node.
 *
 * @summary cordon the provided bare metal machine's Kubernetes node.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachines_Cordon.json
 */
async function cordonBareMetalMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.bareMetalMachines.cordon(
    "resourceGroupName",
    "bareMetalMachineName",
    { bareMetalMachineCordonParameters: { evacuate: "True" } },
  );
  console.log(result);
}

async function main() {
  await cordonBareMetalMachine();
}

main().catch(console.error);
