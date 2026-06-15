// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureTrafficCollectorClient } = require("@azure/arm-networkfunction");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Azure Traffic Collector resource
 *
 * @summary creates or updates a Azure Traffic Collector resource
 * x-ms-original-file: 2022-11-01/AzureTrafficCollectorCreate.json
 */
async function createATrafficCollector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  const result = await client.azureTrafficCollectors.createOrUpdate("rg1", "atc", {
    location: "West US",
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main() {
  await createATrafficCollector();
}

main().catch(console.error);
