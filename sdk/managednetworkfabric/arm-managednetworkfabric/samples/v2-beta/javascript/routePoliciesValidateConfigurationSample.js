// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates the configuration of the resources.
 *
 * @summary validates the configuration of the resources.
 * x-ms-original-file: 2024-06-15-preview/RoutePolicies_ValidateConfiguration.json
 */
async function routePoliciesValidateConfigurationMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.routePolicies.validateConfiguration(
    "example-rg",
    "example-routePolicy",
  );
  console.log(result);
}

async function main() {
  await routePoliciesValidateConfigurationMaximumSetGen();
}

main().catch(console.error);
