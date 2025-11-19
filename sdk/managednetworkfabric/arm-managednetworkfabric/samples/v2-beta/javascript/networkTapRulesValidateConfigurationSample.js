// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements the operation to the underlying resources.
 *
 * @summary implements the operation to the underlying resources.
 * x-ms-original-file: 2024-06-15-preview/NetworkTapRules_ValidateConfiguration.json
 */
async function networkTapRulesValidateConfigurationMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkTapRules.validateConfiguration(
    "example-rg",
    "example-tapRule",
  );
  console.log(result);
}

async function main() {
  await networkTapRulesValidateConfigurationMaximumSetGen();
}

main().catch(console.error);
