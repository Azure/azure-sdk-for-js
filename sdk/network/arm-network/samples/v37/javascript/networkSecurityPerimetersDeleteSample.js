// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a network security perimeter.
 *
 * @summary deletes a network security perimeter.
 * x-ms-original-file: 2025-05-01/NetworkSecurityPerimeterDelete.json
 */
async function networkSecurityPerimeterDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkSecurityPerimeters.delete("rg1", "testNSP1");
}

async function main() {
  await networkSecurityPerimeterDelete();
}

main().catch(console.error);
