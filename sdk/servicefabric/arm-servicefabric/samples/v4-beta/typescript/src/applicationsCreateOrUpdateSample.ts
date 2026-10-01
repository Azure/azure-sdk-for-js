// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagementClient } from "@azure/arm-servicefabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Service Fabric application resource with the specified name.
 *
 * @summary create or update a Service Fabric application resource with the specified name.
 * x-ms-original-file: 2026-03-01-preview/ApplicationPutOperation_example_max.json
 */
async function putAnApplicationWithMaximumParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.applications.createOrUpdate("resRg", "myCluster", "myApp", {
    maximumNodes: 3,
    metrics: [
      { name: "metric1", maximumCapacity: 3, reservationCapacity: 1, totalApplicationCapacity: 5 },
    ],
    minimumNodes: 1,
    parameters: { param1: "value1" },
    removeApplicationCapacity: false,
    typeName: "myAppType",
    typeVersion: "1.0",
    upgradePolicy: {
      applicationHealthPolicy: {
        considerWarningAsError: true,
        defaultServiceTypeHealthPolicy: {
          maxPercentUnhealthyPartitionsPerService: 0,
          maxPercentUnhealthyReplicasPerPartition: 0,
          maxPercentUnhealthyServices: 0,
        },
        maxPercentUnhealthyDeployedApplications: 0,
      },
      forceRestart: false,
      rollingUpgradeMonitoringPolicy: {
        failureAction: "Rollback",
        healthCheckRetryTimeout: "00:10:00",
        healthCheckStableDuration: "00:05:00",
        healthCheckWaitDuration: "00:02:00",
        upgradeDomainTimeout: "1.06:00:00",
        upgradeTimeout: "01:00:00",
      },
      upgradeMode: "Monitored",
      upgradeReplicaSetCheckTimeout: "01:00:00",
    },
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric application resource with the specified name.
 *
 * @summary create or update a Service Fabric application resource with the specified name.
 * x-ms-original-file: 2026-03-01-preview/ApplicationPutOperation_example_min.json
 */
async function putAnApplicationWithMinimumParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.applications.createOrUpdate("resRg", "myCluster", "myApp", {
    location: "eastus",
    removeApplicationCapacity: false,
    typeName: "myAppType",
    typeVersion: "1.0",
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Service Fabric application resource with the specified name.
 *
 * @summary create or update a Service Fabric application resource with the specified name.
 * x-ms-original-file: 2026-03-01-preview/ApplicationPutOperation_recreate_example.json
 */
async function putAnApplicationWithRecreateOption(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.applications.createOrUpdate("resRg", "myCluster", "myApp", {
    parameters: { param1: "value1" },
    typeName: "myAppType",
    typeVersion: "1.0",
    upgradePolicy: { recreateApplication: true },
    tags: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putAnApplicationWithMaximumParameters();
  await putAnApplicationWithMinimumParameters();
  await putAnApplicationWithRecreateOption();
}

main().catch(console.error);
