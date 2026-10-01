// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureTrafficCollectorClient } = require("@azure/arm-networkfunction");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Collector Policy resource
 *
 * @summary creates or updates a Collector Policy resource
 * x-ms-original-file: 2022-11-01/CollectorPolicyCreate.json
 */
async function createACollectionPolicy() {
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

async function main() {
  await createACollectionPolicy();
}

main().catch(console.error);
