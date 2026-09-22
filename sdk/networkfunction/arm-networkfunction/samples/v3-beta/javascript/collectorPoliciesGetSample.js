// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureTrafficCollectorClient } = require("@azure/arm-networkfunction");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the collector policy in a specified Traffic Collector
 *
 * @summary gets the collector policy in a specified Traffic Collector
 * x-ms-original-file: 2022-11-01/CollectorPolicyGet.json
 */
async function getCollectionPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  const result = await client.collectorPolicies.get("rg1", "atc", "cp1");
  console.log(result);
}

async function main() {
  await getCollectionPolicy();
}

main().catch(console.error);
