// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a connection.
 *
 * @summary get a connection.
 * x-ms-original-file: 2026-08-01-preview/Connections_Get.json
 */
async function getAConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
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
