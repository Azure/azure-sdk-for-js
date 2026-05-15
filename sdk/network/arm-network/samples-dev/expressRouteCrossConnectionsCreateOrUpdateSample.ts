// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the specified ExpressRouteCrossConnection.
 *
 * @summary update the specified ExpressRouteCrossConnection.
 * x-ms-original-file: 2025-05-01/ExpressRouteCrossConnectionUpdate.json
 */
async function updateExpressRouteCrossConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCrossConnections.createOrUpdate(
    "CrossConnection-SiliconValley",
    "<circuitServiceKey>",
    { serviceProviderProvisioningState: "NotProvisioned" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateExpressRouteCrossConnection();
}

main().catch(console.error);
