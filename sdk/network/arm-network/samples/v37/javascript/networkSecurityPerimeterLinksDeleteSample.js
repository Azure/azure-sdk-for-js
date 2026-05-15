// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an NSP Link resource.
 *
 * @summary deletes an NSP Link resource.
 * x-ms-original-file: 2025-05-01/NspLinkDelete.json
 */
async function nspLinkDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkSecurityPerimeterLinks.delete("rg1", "nsp1", "link1");
}

async function main() {
  await nspLinkDelete();
}

main().catch(console.error);
