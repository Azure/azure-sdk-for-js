// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an NSP profile.
 *
 * @summary deletes an NSP profile.
 * x-ms-original-file: 2025-05-01/NspProfileDelete.json
 */
async function nspProfilesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkSecurityPerimeterProfiles.delete("rg1", "nsp1", "profile1");
}

async function main() {
  await nspProfilesDelete();
}

main().catch(console.error);
