// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a security rule in the specified resource group.
 *
 * @summary creates or updates a security rule in the specified resource group.
 * x-ms-original-file: 2025-06-01-preview/SecurityRules_CreateOrUpdate.json
 */
async function securityRulesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.securityRules.createOrUpdate("testrg", "testnsg", "rule1", {
    extendedLocation: {
      name: "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
      type: "CustomLocation",
    },
    properties: {
      access: "Allow",
      destinationAddressPrefixes: ["*"],
      destinationPortRanges: ["80"],
      direction: "Inbound",
      priority: 130,
      sourceAddressPrefixes: ["*"],
      sourcePortRanges: ["*"],
      protocol: "*",
    },
  });
  console.log(result);
}

async function main() {
  await securityRulesCreateOrUpdate();
}

main().catch(console.error);
