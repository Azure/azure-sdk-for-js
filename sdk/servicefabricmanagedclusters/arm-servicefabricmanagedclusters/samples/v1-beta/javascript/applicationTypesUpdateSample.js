// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the tags of an application type resource of a given managed cluster.
 *
 * @summary updates the tags of an application type resource of a given managed cluster.
 * x-ms-original-file: 2025-10-01-preview/ApplicationTypeNamePatchOperation_example.json
 */
async function patchAnApplicationType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.applicationTypes.update("resRg", "myCluster", "myAppType", {
    tags: { a: "b" },
  });
  console.log(result);
}

async function main() {
  await patchAnApplicationType();
}

main().catch(console.error);
