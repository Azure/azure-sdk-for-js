// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureTrafficCollectorClient } = require("@azure/arm-networkfunction");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the specified Collector Policy tags.
 *
 * @summary updates the specified Collector Policy tags.
 * x-ms-original-file: 2022-11-01/CollectorPolicyUpdateTags.json
 */
async function updateCollectorPolicyTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  const result = await client.collectorPolicies.updateTags("rg1", "atc", "cp1", {
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateCollectorPolicyTags();
}

main().catch(console.error);
