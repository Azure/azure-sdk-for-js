// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an application resource of a given managed cluster.
 *
 * @summary updates an application resource of a given managed cluster.
 * x-ms-original-file: 2026-02-01/ApplicationPatchOperation_example.json
 */
async function patchAnApplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.applications.update("resRg", "myCluster", "myApp", {
    tags: { a: "b" },
    properties: { parameters: { param1: "value1", param2: "value2" } },
  });
  console.log(result);
}

async function main() {
  await patchAnApplication();
}

main().catch(console.error);
