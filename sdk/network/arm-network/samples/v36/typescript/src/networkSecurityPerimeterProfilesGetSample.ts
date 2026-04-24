// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified NSP profile.
 *
 * @summary Gets the specified NSP profile.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NspProfileGet.json
 */
async function nspProfilesGet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityPerimeterName = "nsp1";
  const profileName = "profile1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterProfiles.get(
    resourceGroupName,
    networkSecurityPerimeterName,
    profileName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nspProfilesGet();
}

main().catch(console.error);
