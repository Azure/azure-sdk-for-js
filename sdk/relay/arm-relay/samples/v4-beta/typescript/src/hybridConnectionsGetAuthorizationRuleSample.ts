// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to hybrid connection authorization rule for a hybrid connection by name.
 *
 * @summary hybrid connection authorization rule for a hybrid connection by name.
 * x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleGet.json
 */
async function relayHybridConnectionAuthorizationRuleGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.hybridConnections.getAuthorizationRule(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-Hybrid-01",
    "example-RelayAuthRules-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await relayHybridConnectionAuthorizationRuleGet();
}

main().catch(console.error);
