// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the tags of an application type version resource of a given managed cluster.
 *
 * @summary updates the tags of an application type version resource of a given managed cluster.
 * x-ms-original-file: 2025-06-01-preview/ApplicationTypeVersionPatchOperation_example.json
 */
async function patchAnApplicationTypeVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.applicationTypeVersions.update(
    "resRg",
    "myCluster",
    "myAppType",
    "1.0",
    { tags: { a: "b" } },
  );
  console.log(result);
}

async function main() {
  await patchAnApplicationTypeVersion();
}

main().catch(console.error);
