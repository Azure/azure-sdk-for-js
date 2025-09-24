// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create or update a Service Fabric managed service resource with the specified name.
 *
 * @summary create or update a Service Fabric managed service resource with the specified name.
 * x-ms-original-file: 2025-03-01-preview/ServicePutOperation_example_max.json
 */

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

async function putAServiceWithMaximumParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("resRg", "myCluster", "myApp", "myService", {
    location: "eastus",
    properties: {
      correlationScheme: [
        {
          scheme: "AlignedAffinity",
          serviceName:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/resRg/providers/Microsoft.ServiceFabric/managedclusters/myCluster/applications/myApp/services/myService1",
        },
      ],
      defaultMoveCost: "Medium",
      instanceCount: 5,
      minInstanceCount: 3,
      minInstancePercentage: 30,
      partitionDescription: { partitionScheme: "Singleton" },
      placementConstraints: "NodeType==frontend",
      scalingPolicies: [
        {
          scalingMechanism: {
            kind: "ScalePartitionInstanceCount",
            maxInstanceCount: 9,
            minInstanceCount: 3,
            scaleIncrement: 2,
          },
          scalingTrigger: {
            kind: "AveragePartitionLoadTrigger",
            lowerLoadThreshold: 2,
            metricName: "metricName",
            scaleInterval: "00:01:00",
            upperLoadThreshold: 8,
          },
        },
      ],
      serviceDnsName: "myservicednsname.myApp",
      serviceKind: "Stateless",
      serviceLoadMetrics: [{ name: "metric1", defaultLoad: 3, weight: "Low" }],
      servicePackageActivationMode: "SharedProcess",
      servicePlacementPolicies: [{ type: "NonPartiallyPlaceService" }],
      serviceTypeName: "myServiceType",
    },
    tags: { a: "b" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric managed service resource with the specified name.
 *
 * @summary create or update a Service Fabric managed service resource with the specified name.
 * x-ms-original-file: 2025-03-01-preview/ServicePutOperation_example_min.json
 */
async function putAServiceWithMinimumParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("resRg", "myCluster", "myApp", "myService", {
    location: "eastus",
    properties: {
      instanceCount: 1,
      partitionDescription: { partitionScheme: "Singleton" },
      serviceKind: "Stateless",
      serviceTypeName: "myServiceType",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putAServiceWithMaximumParameters();
  await putAServiceWithMinimumParameters();
}

main().catch(console.error);
