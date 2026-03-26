// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified NSP profile.
 *
 * @summary gets the specified NSP profile.
 * x-ms-original-file: 2025-05-01/NspProfileGet.json
 */
async function nspProfilesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterProfiles.get("rg1", "nsp1", "profile1");
  console.log(result);
}

async function main(): Promise<void> {
  await nspProfilesGet();
}

main().catch(console.error);
