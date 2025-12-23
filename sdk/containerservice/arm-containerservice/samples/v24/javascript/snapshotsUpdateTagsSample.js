// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates tags on a snapshot.
 *
 * @summary Updates tags on a snapshot.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2025-10-01/examples/SnapshotsUpdateTags.json
 */
async function updateSnapshotTags() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "snapshot1";
  const parameters = { tags: { key2: "new-val2", key3: "val3" } };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.snapshots.updateTags(resourceGroupName, resourceName, parameters);
  console.log(result);
}

async function main() {
  await updateSnapshotTags();
}

main().catch(console.error);
