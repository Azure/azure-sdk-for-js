// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an NSP association resource.
 *
 * @summary deletes an NSP association resource.
 * x-ms-original-file: 2025-05-01/NspAssociationDelete.json
 */
async function nspAssociationDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkSecurityPerimeterAssociations.delete("rg1", "nsp1", "association1");
}

async function main() {
  await nspAssociationDelete();
}

main().catch(console.error);
