// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates tags on a managed cluster snapshot.
 *
 * @summary Updates tags on a managed cluster snapshot.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/ManagedClusterSnapshotsUpdateTags.json
 */
async function updateManagedClusterSnapshotTags() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "snapshot1";
  const parameters = { tags: { key2: "new-val2", key3: "val3" } };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusterSnapshots.updateTags(
    resourceGroupName,
    resourceName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateManagedClusterSnapshotTags();
}

main().catch(console.error);
