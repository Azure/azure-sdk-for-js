// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to un-attach a NetworkConnection.
 *
 * @summary un-attach a NetworkConnection.
 * x-ms-original-file: 2026-01-01-preview/AttachedNetworks_Delete.json
 */
async function attachedNetworksDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.attachedNetworks.delete("rg1", "Contoso", "network-uswest3");
}

async function main(): Promise<void> {
  await attachedNetworksDelete();
}

main().catch(console.error);
