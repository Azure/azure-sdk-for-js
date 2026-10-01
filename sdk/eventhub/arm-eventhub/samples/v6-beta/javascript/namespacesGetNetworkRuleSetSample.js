// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets NetworkRuleSet for a Namespace.
 *
 * @summary gets NetworkRuleSet for a Namespace.
 * x-ms-original-file: 2026-01-01/NameSpaces/VirtualNetworkRule/EHNetworkRuleSetGet.json
 */
async function nameSpaceNetworkRuleSetGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "Subscription";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.getNetworkRuleSet("ResourceGroup", "sdk-Namespace-6019");
  console.log(result);
}

async function main() {
  await nameSpaceNetworkRuleSetGet();
}

main().catch(console.error);
