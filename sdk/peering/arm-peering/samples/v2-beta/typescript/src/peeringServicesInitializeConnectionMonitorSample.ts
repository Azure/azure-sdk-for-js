// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to initialize Peering Service for Connection Monitor functionality
 *
 * @summary initialize Peering Service for Connection Monitor functionality
 * x-ms-original-file: 2025-05-01/InitializeConnectionMonitor.json
 */
async function initializePeeringServiceForConnectionMonitorFunctionality(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  await client.peeringServices.initializeConnectionMonitor();
}

async function main(): Promise<void> {
  await initializePeeringServiceForConnectionMonitorFunctionality();
}

main().catch(console.error);
