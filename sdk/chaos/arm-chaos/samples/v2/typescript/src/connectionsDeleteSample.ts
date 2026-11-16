// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a connection.
 *
 * @summary delete a connection.
 * x-ms-original-file: 2026-11-01/Connections_Delete.json
 */
async function deleteAConnectionInAWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ChaosManagementClient(credential, subscriptionId);
  await client.connections.delete("exampleRG", "exampleWorkspace", "aksClusterConnection");
}

async function main(): Promise<void> {
  await deleteAConnectionInAWorkspace();
}

main().catch(console.error);
