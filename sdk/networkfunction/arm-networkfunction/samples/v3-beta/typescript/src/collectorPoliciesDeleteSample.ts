// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureTrafficCollectorClient } from "@azure/arm-networkfunction";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a specified Collector Policy resource.
 *
 * @summary deletes a specified Collector Policy resource.
 * x-ms-original-file: 2022-11-01/CollectorPolicyDelete.json
 */
async function deleteCollectionPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  await client.collectorPolicies.delete("rg1", "atc", "cp1");
}

async function main(): Promise<void> {
  await deleteCollectionPolicy();
}

main().catch(console.error);
