// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a hybrid connection authorization rule.
 *
 * @summary deletes a hybrid connection authorization rule.
 * x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleDelete.json
 */
async function relayHybridConnectionAuthorizationRuleDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  await client.hybridConnections.deleteAuthorizationRule(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-Hybrid-01",
    "example-RelayAuthRules-01",
  );
}

async function main() {
  await relayHybridConnectionAuthorizationRuleDelete();
}

main().catch(console.error);
