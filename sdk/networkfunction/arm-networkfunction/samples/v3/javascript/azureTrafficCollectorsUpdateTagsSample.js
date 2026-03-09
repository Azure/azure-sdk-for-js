// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureTrafficCollectorClient } = require("@azure/arm-networkfunction");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the specified Azure Traffic Collector tags.
 *
 * @summary updates the specified Azure Traffic Collector tags.
 * x-ms-original-file: 2022-11-01/AzureTrafficCollectorUpdateTags.json
 */
async function updateTrafficCollectorTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  const result = await client.azureTrafficCollectors.updateTags("rg1", "atc", {
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateTrafficCollectorTags();
}

main().catch(console.error);
