// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureTrafficCollectorClient } = require("@azure/arm-networkfunction");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a specified Azure Traffic Collector resource.
 *
 * @summary deletes a specified Azure Traffic Collector resource.
 * x-ms-original-file: 2022-11-01/AzureTrafficCollectorDelete.json
 */
async function deleteTrafficCollector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  await client.azureTrafficCollectors.delete("rg1", "atc");
}

async function main() {
  await deleteTrafficCollector();
}

main().catch(console.error);
