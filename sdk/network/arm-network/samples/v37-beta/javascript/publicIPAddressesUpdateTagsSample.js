// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates public IP address tags.
 *
 * @summary updates public IP address tags.
 * x-ms-original-file: 2025-05-01/PublicIpAddressUpdateTags.json
 */
async function updatePublicIPAddressTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.updateTags("rg1", "test-ip", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updatePublicIPAddressTags();
}

main().catch(console.error);
