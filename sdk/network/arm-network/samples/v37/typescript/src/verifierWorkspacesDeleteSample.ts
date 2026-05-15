// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes Verifier Workspace.
 *
 * @summary deletes Verifier Workspace.
 * x-ms-original-file: 2025-05-01/VerifierWorkspaceDelete.json
 */
async function verifierWorkspaceDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.verifierWorkspaces.delete("rg1", "testNetworkManager", "testWorkspace");
}

async function main(): Promise<void> {
  await verifierWorkspaceDelete();
}

main().catch(console.error);
