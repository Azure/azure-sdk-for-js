// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Service Fabric managed application resource with the specified name.
 *
 * @summary create or update a Service Fabric managed application resource with the specified name.
 * x-ms-original-file: 2025-06-01-preview/ApplicationPutOperation_example_max.json
 */
async function putAnApplicationWithMaximumParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.applications.createOrUpdate("resRg", "myCluster", "myApp", {
    location: "eastus",
    properties: {
      parameters: { param1: "value1" },
      upgradePolicy: {
        applicationHealthPolicy: {
          considerWarningAsError: true,
          defaultServiceTypeHealthPolicy: {
            maxPercentUnhealthyPartitionsPerService: 0,
            maxPercentUnhealthyReplicasPerPartition: 0,
            maxPercentUnhealthyServices: 0,
          },
          maxPercentUnhealthyDeployedApplications: 0,
          serviceTypeHealthPolicyMap: {
            service1: {
              maxPercentUnhealthyPartitionsPerService: 30,
              maxPercentUnhealthyReplicasPerPartition: 30,
              maxPercentUnhealthyServices: 30,
            },
          },
        },
        forceRestart: false,
        instanceCloseDelayDuration: 600,
        recreateApplication: false,
        rollingUpgradeMonitoringPolicy: {
          failureAction: "Rollback",
          healthCheckRetryTimeout: "00:10:00",
          healthCheckStableDuration: "00:05:00",
          healthCheckWaitDuration: "00:02:00",
          upgradeDomainTimeout: "00:15:00",
          upgradeTimeout: "01:00:00",
        },
        upgradeMode: "UnmonitoredAuto",
        upgradeReplicaSetCheckTimeout: 3600,
      },
      version:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/resRg/providers/Microsoft.ServiceFabric/managedclusters/myCluster/applicationTypes/myAppType/versions/1.0",
    },
    tags: { a: "b" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric managed application resource with the specified name.
 *
 * @summary create or update a Service Fabric managed application resource with the specified name.
 * x-ms-original-file: 2025-06-01-preview/ApplicationPutOperation_example_min.json
 */
async function putAnApplicationWithMinimumParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.applications.createOrUpdate("resRg", "myCluster", "myApp", {
    location: "eastus",
    properties: {
      version:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/resRg/providers/Microsoft.ServiceFabric/managedclusters/myCluster/applicationTypes/myAppType/versions/1.0",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putAnApplicationWithMaximumParameters();
  await putAnApplicationWithMinimumParameters();
}

main().catch(console.error);
