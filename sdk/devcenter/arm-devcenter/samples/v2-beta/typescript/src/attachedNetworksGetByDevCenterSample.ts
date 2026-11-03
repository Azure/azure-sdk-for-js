// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an attached NetworkConnection.
 *
 * @summary gets an attached NetworkConnection.
 * x-ms-original-file: 2026-01-01-preview/AttachedNetworks_GetByDevCenter.json
 */
async function attachedNetworksGetByDevCenter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.attachedNetworks.getByDevCenter("rg1", "Contoso", "network-uswest3");
  console.log(result);
}

async function main(): Promise<void> {
  await attachedNetworksGetByDevCenter();
}

main().catch(console.error);
