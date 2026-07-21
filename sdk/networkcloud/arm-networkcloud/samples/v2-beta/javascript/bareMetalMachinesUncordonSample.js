// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to uncordon the provided bare metal machine's Kubernetes node.
 *
 * @summary uncordon the provided bare metal machine's Kubernetes node.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachines_Uncordon.json
 */
async function uncordonBareMetalMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.bareMetalMachines.uncordon(
    "resourceGroupName",
    "bareMetalMachineName",
  );
  console.log(result);
}

async function main() {
  await uncordonBareMetalMachine();
}

main().catch(console.error);
