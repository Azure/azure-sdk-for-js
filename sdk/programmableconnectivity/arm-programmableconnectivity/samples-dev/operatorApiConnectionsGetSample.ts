// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgrammableConnectivityClient } from "@azure/arm-programmableconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an Operator API Connection.
 *
 * @summary get an Operator API Connection.
 * x-ms-original-file: 2025-03-30-preview/OperatorApiConnections_Get_MaximumSet_Gen.json
 */
async function operatorApiConnectionsGetMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "93519EA0-206F-42A3-8126-A234F19328E0";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const result = await client.operatorApiConnections.get("rgopenapi", "operatorApiConnectionName");
  console.log(result);
}

async function main(): Promise<void> {
  await operatorApiConnectionsGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
