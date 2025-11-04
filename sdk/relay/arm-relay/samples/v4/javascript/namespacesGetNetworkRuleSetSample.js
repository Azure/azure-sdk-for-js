// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets NetworkRuleSet for a Namespace.
 *
 * @summary gets NetworkRuleSet for a Namespace.
 * x-ms-original-file: 2024-01-01/VirtualNetworkRules/RelayNetworkRuleSetGet.json
 */
async function nameSpaceNetworkRuleSetGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "Subscription";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.namespaces.getNetworkRuleSet(
    "ResourceGroup",
    "example-RelayNamespace-6019",
  );
  console.log(result);
}

async function main() {
  await nameSpaceNetworkRuleSetGet();
}

main().catch(console.error);
