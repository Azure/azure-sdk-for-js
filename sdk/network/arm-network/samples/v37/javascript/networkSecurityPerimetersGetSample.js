// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified network security perimeter by the name.
 *
 * @summary gets the specified network security perimeter by the name.
 * x-ms-original-file: 2025-05-01/NetworkSecurityPerimeterGet.json
 */
async function networkSecurityPerimeterGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeters.get("rg1", "nsp1");
  console.log(result);
}

async function main() {
  await networkSecurityPerimeterGet();
}

main().catch(console.error);
