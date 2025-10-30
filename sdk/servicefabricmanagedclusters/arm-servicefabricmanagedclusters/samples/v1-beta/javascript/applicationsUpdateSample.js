// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the tags of an application resource of a given managed cluster.
 *
 * @summary updates the tags of an application resource of a given managed cluster.
 * x-ms-original-file: 2025-06-01-preview/ApplicationPatchOperation_example.json
 */
async function patchAnApplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.applications.update("resRg", "myCluster", "myApp", {
    tags: { a: "b" },
  });
  console.log(result);
}

async function main() {
  await patchAnApplication();
}

main().catch(console.error);
