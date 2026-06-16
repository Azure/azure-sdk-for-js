// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceFabricManagementClient } = require("@azure/arm-servicefabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Service Fabric application resource with the specified name.
 *
 * @summary update a Service Fabric application resource with the specified name.
 * x-ms-original-file: 2026-03-01-preview/ApplicationPatchOperation_example.json
 */
async function patchAnApplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.applications.update("resRg", "myCluster", "myApp", {
    metrics: [
      { name: "metric1", maximumCapacity: 3, reservationCapacity: 1, totalApplicationCapacity: 5 },
    ],
    removeApplicationCapacity: false,
    typeVersion: "1.0",
    tags: {},
  });
  console.log(result);
}

async function main() {
  await patchAnApplication();
}

main().catch(console.error);
