// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disconnect a data connector.
 *
 * @summary disconnect a data connector.
 * x-ms-original-file: 2025-07-01-preview/dataConnectors/DisconnectAPIPolling.json
 */
async function disconnectAnAPIPollingDataConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.dataConnectors.disconnect(
    "myRg",
    "myWorkspace",
    "316ec55e-7138-4d63-ab18-90c8a60fd1c8",
  );
}

async function main(): Promise<void> {
  await disconnectAnAPIPollingDataConnector();
}

main().catch(console.error);
