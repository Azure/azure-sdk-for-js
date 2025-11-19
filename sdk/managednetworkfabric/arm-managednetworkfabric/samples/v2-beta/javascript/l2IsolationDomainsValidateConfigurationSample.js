// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates the configuration of the resources.
 *
 * @summary validates the configuration of the resources.
 * x-ms-original-file: 2024-06-15-preview/L2IsolationDomains_ValidateConfiguration.json
 */
async function l2IsolationDomainsValidateConfigurationMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.l2IsolationDomains.validateConfiguration(
    "example-rg",
    "example-l2domain",
  );
  console.log(result);
}

async function main() {
  await l2IsolationDomainsValidateConfigurationMaximumSetGen();
}

main().catch(console.error);
