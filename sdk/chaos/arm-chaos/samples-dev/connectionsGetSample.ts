// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a connection.
 *
 * @summary get a connection.
 * x-ms-original-file: 2026-11-01/Connections_Get.json
 */
async function getAConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.connections.get(
    "exampleRG",
    "exampleWorkspace",
    "aksClusterConnection",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAConnection();
}

main().catch(console.error);
