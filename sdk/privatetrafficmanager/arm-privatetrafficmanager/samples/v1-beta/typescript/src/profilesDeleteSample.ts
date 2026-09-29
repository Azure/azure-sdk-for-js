// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-privatetrafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Private Traffic Manager profile.
 *
 * @summary deletes a Private Traffic Manager profile.
 * x-ms-original-file: 2026-02-09-preview/Profiles_Delete_MaximumSet_Gen.json
 */
async function profilesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new NetworkClient(credential, subscriptionId);
  await client.profiles.delete("rgprivateTrafficManager", "myProfile");
}

async function main(): Promise<void> {
  await profilesDeleteMaximumSet();
}

main().catch(console.error);
