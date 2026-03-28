// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates Verifier Workspace.
 *
 * @summary creates Verifier Workspace.
 * x-ms-original-file: 2025-05-01/VerifierWorkspacePut.json
 */
async function verifierWorkspaceCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.verifierWorkspaces.create(
    "rg1",
    "testNetworkManager",
    "testWorkspace",
    { location: "eastus", properties: { description: "A sample workspace" } },
  );
  console.log(result);
}

async function main() {
  await verifierWorkspaceCreate();
}

main().catch(console.error);
