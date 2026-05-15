// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates Verifier Workspace.
 *
 * @summary updates Verifier Workspace.
 * x-ms-original-file: 2025-05-01/VerifierWorkspacePatch.json
 */
async function verifierWorkspacePatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.verifierWorkspaces.update(
    "rg1",
    "testNetworkManager",
    "testWorkspace",
  );
  console.log(result);
}

async function main() {
  await verifierWorkspacePatch();
}

main().catch(console.error);
