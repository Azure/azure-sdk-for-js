// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureTrafficCollectorClient } from "@azure/arm-networkfunction";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to return list of Collector policies in a Azure Traffic Collector
 *
 * @summary return list of Collector policies in a Azure Traffic Collector
 * x-ms-original-file: 2022-11-01/CollectorPoliciesList.json
 */
async function listOfCollectionPolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.collectorPolicies.list("rg1", "atc")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listOfCollectionPolicies();
}

main().catch(console.error);
