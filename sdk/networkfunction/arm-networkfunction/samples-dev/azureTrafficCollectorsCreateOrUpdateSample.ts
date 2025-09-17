// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a Azure Traffic Collector resource
 *
 * @summary Creates or updates a Azure Traffic Collector resource
 * x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/AzureTrafficCollectorCreate.json
 */

import type { AzureTrafficCollectorsCreateOrUpdateOptionalParams } from "@azure/arm-networkfunction";
import { AzureTrafficCollectorClient } from "@azure/arm-networkfunction";
import { DefaultAzureCredential } from "@azure/identity";

async function createATrafficCollector(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "rg1";
  const azureTrafficCollectorName = "atc";
  const location = "West US";
  const tags = { key1: "value1" };
  const options: AzureTrafficCollectorsCreateOrUpdateOptionalParams = { tags };
  const credential = new DefaultAzureCredential();
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  const result = await client.azureTrafficCollectors.beginCreateOrUpdateAndWait(
    resourceGroupName,
    azureTrafficCollectorName,
    location,
    options,
  );
  console.log(result);
}

createATrafficCollector().catch(console.error);
