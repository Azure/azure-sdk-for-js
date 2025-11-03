// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets NetworkRuleSet for a Namespace.
 *
 * @summary gets NetworkRuleSet for a Namespace.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/VirtualNetworkRule/SBNetworkRuleSetGet.json
 */
async function nameSpaceNetworkRuleSetGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.namespaces.getNetworkRuleSet("ResourceGroup", "sdk-Namespace-6019");
  console.log(result);
}

async function main() {
  await nameSpaceNetworkRuleSetGet();
}

main().catch(console.error);
