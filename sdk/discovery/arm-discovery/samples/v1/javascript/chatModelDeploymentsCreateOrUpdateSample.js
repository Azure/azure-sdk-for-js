// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a ChatModelDeployment
 *
 * @summary create a ChatModelDeployment
 * x-ms-original-file: 2026-06-01/ChatModelDeployments_CreateOrUpdate_MaximumSet_Gen.json
 */
async function chatModelDeploymentsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.chatModelDeployments.createOrUpdate(
    "rgdiscovery",
    "f3ed10c1c617387d5d",
    "2143036f84d477b367",
    {
      properties: {
        modelFormat: "zo",
        modelName: "ijzwlirrkr",
        modelVersion: "seiduxog",
        skuName: "dymgademiauwwacz",
        capacity: 8,
      },
      tags: { key984: "sqzgsgykyhltqwmpgvhlyp" },
      location: "uksouth",
    },
  );
  console.log(result);
}

async function main() {
  await chatModelDeploymentsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
