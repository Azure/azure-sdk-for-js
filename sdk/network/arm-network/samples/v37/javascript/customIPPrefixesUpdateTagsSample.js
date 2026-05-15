// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates custom IP prefix tags.
 *
 * @summary updates custom IP prefix tags.
 * x-ms-original-file: 2025-05-01/CustomIpPrefixUpdateTags.json
 */
async function updatePublicIPAddressTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.customIPPrefixes.updateTags("rg1", "test-customipprefix", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updatePublicIPAddressTags();
}

main().catch(console.error);
