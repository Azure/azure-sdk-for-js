// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete an Operator API Connection.
 *
 * @summary delete an Operator API Connection.
 * x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_Delete_MinimumSet_Gen.json
 */

import { ProgrammableConnectivityClient } from "@azure/arm-programmableconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

async function operatorApiConnectionsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "B976474B-99FA-4C25-A3BD-8B05C3C3D07A";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  await client.operatorApiConnections.delete("rgopenapi", "dawr");
}

async function main(): Promise<void> {
  await operatorApiConnectionsDelete();
}

main().catch(console.error);
