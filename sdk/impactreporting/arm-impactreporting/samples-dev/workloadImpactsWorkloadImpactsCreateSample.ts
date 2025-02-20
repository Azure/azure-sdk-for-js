// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactClient } from "@azure/arm-impactreporting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a WorkloadImpact
 *
 * @summary create a WorkloadImpact
 * x-ms-original-file: 2024-05-01-preview/WorkloadArmOperation_create.json
 */
async function reportingArmOperationFailure(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.workloadImpacts.WorkloadImpacts_create("impact-002", {
    properties: {
      impactedResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resource-rg/providers/Microsoft.Sql/sqlserver/dbservercontext",
      startDateTime: new Date("2022-06-15T05:59:46.6517821Z"),
      impactDescription: "deletion of resource failed",
      impactCategory: "ArmOperation",
      armCorrelationIds: ["00000000-0000-0000-0000-000000000000"],
      workload: { context: "webapp/scenario1", toolset: "Other" },
      clientIncidentDetails: {
        clientIncidentId: "AA123",
        clientIncidentSource: "Jira",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a WorkloadImpact
 *
 * @summary create a WorkloadImpact
 * x-ms-original-file: 2024-05-01-preview/WorkloadAvailability_Create.json
 */
async function reportingAvailabilityRelatedImpact(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.workloadImpacts.WorkloadImpacts_create("impact-002", {
    properties: {
      impactedResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resource-rg/providers/Microsoft.Sql/sqlserver/dbservercontext",
      startDateTime: new Date("2022-06-15T05:59:46.6517821Z"),
      impactDescription: "read calls failed",
      impactCategory: "Availability",
      workload: { context: "webapp/scenario1", toolset: "Other" },
      clientIncidentDetails: {
        clientIncidentId: "AA123",
        clientIncidentSource: "Jira",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a WorkloadImpact
 *
 * @summary create a WorkloadImpact
 * x-ms-original-file: 2024-05-01-preview/WorkloadConnectivityImpact_Create.json
 */
async function reportingAConnectivityImpact(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.workloadImpacts.WorkloadImpacts_create("impact-001", {
    properties: {
      impactedResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resource-rg/providers/Microsoft.Sql/sqlserver/dbservercontext",
      startDateTime: new Date("2022-06-15T05:59:46.6517821Z"),
      impactDescription: "conection failure",
      impactCategory: "Resource.Connectivity",
      connectivity: {
        protocol: "TCP",
        port: 1443,
        source: {
          azureResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resourceSub/providers/Microsoft.compute/virtualmachines/vm1",
        },
        target: {
          azureResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resourceSub/providers/Microsoft.compute/virtualmachines/vm2",
        },
      },
      workload: { context: "webapp/scenario1", toolset: "Other" },
      clientIncidentDetails: {
        clientIncidentId: "AA123",
        clientIncidentSource: "Jira",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a WorkloadImpact
 *
 * @summary create a WorkloadImpact
 * x-ms-original-file: 2024-05-01-preview/WorkloadPerformance_Create.json
 */
async function reportingPerformanceRelatedImpact(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.workloadImpacts.WorkloadImpacts_create("impact-002", {
    properties: {
      impactedResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resource-rg/providers/Microsoft.Sql/sqlserver/dbservercontext",
      startDateTime: new Date("2022-06-15T05:59:46.6517821Z"),
      impactDescription: "high cpu utilization",
      impactCategory: "Resource.Performance",
      workload: { context: "webapp/scenario1", toolset: "Other" },
      performance: [{ metricName: "CPU", actual: 90, expected: 60 }],
      clientIncidentDetails: {
        clientIncidentId: "AA123",
        clientIncidentSource: "Jira",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  reportingArmOperationFailure();
  reportingAvailabilityRelatedImpact();
  reportingAConnectivityImpact();
  reportingPerformanceRelatedImpact();
}

main().catch(console.error);
