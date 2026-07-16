// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to primary and secondary connection strings to the hybrid connection.
 *
 * @summary primary and secondary connection strings to the hybrid connection.
 * x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleListKey.json
 */
async function relayHybridConnectionAuthorizationRuleListKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.hybridConnections.listKeys(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-Hybrid-01",
    "example-RelayAuthRules-01",
  );
  console.log(result);
}

async function main() {
  await relayHybridConnectionAuthorizationRuleListKey();
}

main().catch(console.error);
