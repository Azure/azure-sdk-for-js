// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a network profile.
 *
 * @summary creates or updates a network profile.
 * x-ms-original-file: 2025-05-01/NspProfilePut.json
 */
async function nspProfilesPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterProfiles.createOrUpdate(
    "rg1",
    "nsp1",
    "profile1",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nspProfilesPut();
}

main().catch(console.error);
