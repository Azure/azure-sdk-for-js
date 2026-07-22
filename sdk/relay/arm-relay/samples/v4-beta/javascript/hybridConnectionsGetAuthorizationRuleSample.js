// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to hybrid connection authorization rule for a hybrid connection by name.
 *
 * @summary hybrid connection authorization rule for a hybrid connection by name.
 * x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleGet.json
 */
async function relayHybridConnectionAuthorizationRuleGet() {
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

async function main() {
  await relayHybridConnectionAuthorizationRuleGet();
}

main().catch(console.error);
