// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureTrafficCollectorClient } from "@azure/arm-networkfunction";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a specified Azure Traffic Collector resource.
 *
 * @summary deletes a specified Azure Traffic Collector resource.
 * x-ms-original-file: 2022-11-01/AzureTrafficCollectorDelete.json
 */
async function deleteTrafficCollector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  await client.azureTrafficCollectors.delete("rg1", "atc");
}

async function main(): Promise<void> {
  await deleteTrafficCollector();
}

main().catch(console.error);
