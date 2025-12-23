// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a snapshot.
 *
 * @summary Creates or updates a snapshot.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2025-10-01/examples/SnapshotsCreate.json
 */
async function createOrUpdateSnapshot() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "snapshot1";
  const parameters = {
    creationData: {
      sourceResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg1/providers/Microsoft.ContainerService/managedClusters/cluster1/agentPools/pool0",
    },
    location: "westus",
    tags: { key1: "val1", key2: "val2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.snapshots.createOrUpdate(resourceGroupName, resourceName, parameters);
  console.log(result);
}

async function main() {
  await createOrUpdateSnapshot();
}

main().catch(console.error);
