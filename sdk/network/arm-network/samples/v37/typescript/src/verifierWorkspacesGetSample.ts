// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets Verifier Workspace.
 *
 * @summary gets Verifier Workspace.
 * x-ms-original-file: 2025-05-01/VerifierWorkspaceGet.json
 */
async function verifierWorkspaceGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.verifierWorkspaces.get("rg1", "testNetworkManager", "testWorkspace");
  console.log(result);
}

async function main(): Promise<void> {
  await verifierWorkspaceGet();
}

main().catch(console.error);
