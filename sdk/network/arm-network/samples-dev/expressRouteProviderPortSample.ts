// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves detail of a provider port.
 *
 * @summary retrieves detail of a provider port.
 * x-ms-original-file: 2025-05-01/expressRouteProviderPort.json
 */
async function expressRouteProviderPort(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteProviderPort("abc");
  console.log(result);
}

async function main(): Promise<void> {
  await expressRouteProviderPort();
}

main().catch(console.error);
