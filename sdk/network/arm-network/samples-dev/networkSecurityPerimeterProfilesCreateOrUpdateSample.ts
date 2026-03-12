// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NspProfile} from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a network profile.
 *
 * @summary Creates or updates a network profile.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NspProfilePut.json
 */
async function nspProfilesPut(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityPerimeterName = "nsp1";
  const profileName = "profile1";
  const parameters: NspProfile = {};
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterProfiles.createOrUpdate(
    resourceGroupName,
    networkSecurityPerimeterName,
    profileName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nspProfilesPut();
}

main().catch(console.error);
