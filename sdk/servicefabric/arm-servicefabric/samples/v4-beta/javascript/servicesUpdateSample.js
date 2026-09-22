// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceFabricManagementClient } = require("@azure/arm-servicefabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Service Fabric service resource with the specified name.
 *
 * @summary update a Service Fabric service resource with the specified name.
 * x-ms-original-file: 2026-03-01-preview/ServicePatchOperation_example.json
 */
async function patchAService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.services.update("resRg", "myCluster", "myApp", "myService", {
    properties: {
      serviceKind: "Stateless",
      serviceLoadMetrics: [{ name: "metric1", weight: "Low" }],
    },
    tags: {},
  });
  console.log(result);
}

async function main() {
  await patchAService();
}

main().catch(console.error);
