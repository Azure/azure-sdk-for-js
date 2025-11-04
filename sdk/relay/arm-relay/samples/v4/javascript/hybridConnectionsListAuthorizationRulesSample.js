// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to authorization rules for a hybrid connection.
 *
 * @summary authorization rules for a hybrid connection.
 * x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleListAll.json
 */
async function relayHybridConnectionAuthorizationRuleListAll() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.hybridConnections.listAuthorizationRules(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-Hybrid-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await relayHybridConnectionAuthorizationRuleListAll();
}

main().catch(console.error);
