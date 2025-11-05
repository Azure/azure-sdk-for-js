// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an authorization rule for a hybrid connection.
 *
 * @summary creates or updates an authorization rule for a hybrid connection.
 * x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleCreate.json
 */
async function relayHybridConnectionAuthorizationRuleCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.hybridConnections.createOrUpdateAuthorizationRule(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-Hybrid-01",
    "example-RelayAuthRules-01",
    { properties: { rights: ["Listen", "Send"] } },
  );
  console.log(result);
}

async function main() {
  await relayHybridConnectionAuthorizationRuleCreate();
}

main().catch(console.error);
