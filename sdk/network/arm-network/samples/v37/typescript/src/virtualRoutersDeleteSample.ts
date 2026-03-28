// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified Virtual Router.
 *
 * @summary deletes the specified Virtual Router.
 * x-ms-original-file: 2025-05-01/VirtualRouterDelete.json
 */
async function deleteVirtualRouter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualRouters.delete("rg1", "virtualRouter");
}

async function main(): Promise<void> {
  await deleteVirtualRouter();
}

main().catch(console.error);
