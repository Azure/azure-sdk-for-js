// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureTrafficCollectorClient } = require("@azure/arm-networkfunction");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified Azure Traffic Collector in a specified resource group
 *
 * @summary gets the specified Azure Traffic Collector in a specified resource group
 * x-ms-original-file: 2022-11-01/AzureTrafficCollectorGet.json
 */
async function getTrafficCollector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  const result = await client.azureTrafficCollectors.get("rg1", "atc");
  console.log(result);
}

async function main() {
  await getTrafficCollector();
}

main().catch(console.error);
