// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Return list of Collector policies in a Azure Traffic Collector
 *
 * @summary Return list of Collector policies in a Azure Traffic Collector
 * x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/CollectorPoliciesList.json
 */

import { AzureTrafficCollectorClient } from "@azure/arm-networkfunction";
import { DefaultAzureCredential } from "@azure/identity";

async function listOfCollectionPolicies(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "rg1";
  const azureTrafficCollectorName = "atc";
  const credential = new DefaultAzureCredential();
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.collectorPolicies.list(
    resourceGroupName,
    azureTrafficCollectorName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

listOfCollectionPolicies().catch(console.error);
