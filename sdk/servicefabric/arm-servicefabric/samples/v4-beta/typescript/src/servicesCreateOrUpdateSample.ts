// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagementClient } from "@azure/arm-servicefabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Service Fabric service resource with the specified name.
 *
 * @summary create or update a Service Fabric service resource with the specified name.
 * x-ms-original-file: 2026-03-01-preview/ServicePutOperation_example_max.json
 */
async function putAServiceWithMaximumParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("resRg", "myCluster", "myApp", "myService", {
    properties: {
      correlationScheme: [{ scheme: "Affinity", serviceName: "fabric:/app1/app1~svc1" }],
      defaultMoveCost: "Medium",
      instanceCount: 5,
      partitionDescription: { partitionScheme: "Singleton" },
      placementConstraints: "NodeType==frontend",
      serviceDnsName: "my.service.dns",
      serviceKind: "Stateless",
      serviceLoadMetrics: [{ name: "metric1", weight: "Low" }],
      servicePackageActivationMode: "SharedProcess",
      servicePlacementPolicies: [],
      serviceTypeName: "myServiceType",
    },
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric service resource with the specified name.
 *
 * @summary create or update a Service Fabric service resource with the specified name.
 * x-ms-original-file: 2026-03-01-preview/ServicePutOperation_example_min.json
 */
async function putAServiceWithMinimumParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("resRg", "myCluster", "myApp", "myService", {
    properties: {
      instanceCount: 1,
      partitionDescription: { partitionScheme: "Singleton" },
      serviceKind: "Stateless",
      serviceTypeName: "myServiceType",
    },
    tags: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putAServiceWithMaximumParameters();
  await putAServiceWithMinimumParameters();
}

main().catch(console.error);
