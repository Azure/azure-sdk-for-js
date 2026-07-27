// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to replace all specified Event Hubs Cluster settings with those contained in the request body. Leaves the settings not specified in the request body unmodified.
 *
 * @summary replace all specified Event Hubs Cluster settings with those contained in the request body. Leaves the settings not specified in the request body unmodified.
 * x-ms-original-file: 2026-01-01/Clusters/ClusterQuotaConfigurationPatch.json
 */
async function clustersQuotasConfigurationPatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.configuration.patch("ArunMonocle", "testCluster", {
    settings: { "eventhub-per-namespace-quota": "20", "namespaces-per-cluster-quota": "200" },
  });
  console.log(result);
}

async function main() {
  await clustersQuotasConfigurationPatch();
}

main().catch(console.error);
