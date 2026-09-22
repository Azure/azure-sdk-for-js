// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureTrafficCollectorClient } = require("@azure/arm-networkfunction");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to return list of Collector policies in a Azure Traffic Collector
 *
 * @summary return list of Collector policies in a Azure Traffic Collector
 * x-ms-original-file: 2022-11-01/CollectorPoliciesList.json
 */
async function listOfCollectionPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.collectorPolicies.list("rg1", "atc")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOfCollectionPolicies();
}

main().catch(console.error);
