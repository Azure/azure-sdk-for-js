// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureTrafficCollectorClient } from "@azure/arm-networkfunction";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the specified Collector Policy tags.
 *
 * @summary updates the specified Collector Policy tags.
 * x-ms-original-file: 2022-11-01/CollectorPolicyUpdateTags.json
 */
async function updateCollectorPolicyTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  const result = await client.collectorPolicies.updateTags("rg1", "atc", "cp1", {
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateCollectorPolicyTags();
}

main().catch(console.error);
