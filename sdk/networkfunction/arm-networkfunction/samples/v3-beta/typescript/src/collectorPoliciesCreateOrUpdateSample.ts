// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureTrafficCollectorClient } from "@azure/arm-networkfunction";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Collector Policy resource
 *
 * @summary creates or updates a Collector Policy resource
 * x-ms-original-file: 2022-11-01/CollectorPolicyCreate.json
 */
async function createACollectionPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  const result = await client.collectorPolicies.createOrUpdate("rg1", "atc", "cp1", {
    location: "West US",
    emissionPolicies: [
      { emissionDestinations: [{ destinationType: "AzureMonitor" }], emissionType: "IPFIX" },
    ],
    ingestionPolicy: {
      ingestionSources: [
        {
          resourceId:
            "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/expressRouteCircuits/circuitName",
          sourceType: "Resource",
        },
      ],
      ingestionType: "IPFIX",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createACollectionPolicy();
}

main().catch(console.error);
