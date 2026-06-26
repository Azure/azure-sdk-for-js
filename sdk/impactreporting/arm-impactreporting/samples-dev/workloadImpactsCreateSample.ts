// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactClient } from "@azure/arm-impactreporting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a WorkloadImpact
 *
 * @summary create a WorkloadImpact
 * x-ms-original-file: 2026-01-01-preview/WorkloadArmOperation_create.json
 */
async function reportingArmOperationFailure(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.workloadImpacts.create("impact-002", {
    properties: {
      impactedResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resource-rg/providers/Microsoft.Sql/sqlserver/dbservercontext",
      startDateTime: new Date("2022-06-15T05:59:46.6517821Z"),
      impactDescription: "deletion of resource failed",
      impactCategory: "ArmOperation",
      armCorrelationIds: ["00000000-0000-0000-0000-000000000000"],
      workload: { context: "webapp/scenario1", toolset: "Other" },
      clientIncidentDetails: { clientIncidentId: "AA123", clientIncidentSource: "Jira" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a WorkloadImpact
 *
 * @summary create a WorkloadImpact
 * x-ms-original-file: 2026-01-01-preview/WorkloadAvailability_Create.json
 */
async function reportingAvailabilityRelatedImpact(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.workloadImpacts.create("impact-002", {
    properties: {
      impactedResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resource-rg/providers/Microsoft.Sql/sqlserver/dbservercontext",
      startDateTime: new Date("2022-06-15T05:59:46.6517821Z"),
      impactDescription: "read calls failed",
      impactCategory: "Availability",
      workload: { context: "webapp/scenario1", toolset: "Other" },
      clientIncidentDetails: { clientIncidentId: "AA123", clientIncidentSource: "Jira" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a WorkloadImpact
 *
 * @summary create a WorkloadImpact
 * x-ms-original-file: 2026-01-01-preview/WorkloadConnectivityImpact_Create.json
 */
async function reportingAConnectivityImpact(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.workloadImpacts.create("impact-001", {
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
      clientIncidentDetails: { clientIncidentId: "AA123", clientIncidentSource: "Jira" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a WorkloadImpact
 *
 * @summary create a WorkloadImpact
 * x-ms-original-file: 2026-01-01-preview/WorkloadImpacts_Create_MaximumSet_Gen.json
 */
async function workloadImpactsCreateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0D045314-435A-41DA-B0A4-2CA7E9F87D12";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.workloadImpacts.create("testWorkloadImpact", {
    properties: {
      startDateTime: new Date("2024-12-04T19:51:13.274Z"),
      endDateTime: new Date("2024-12-04T19:51:13.274Z"),
      impactedResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resource-rg/providers/Microsoft.Sql/sqlserver/dbservername",
      impactCategory: "Resource.Other",
      impactDescription: "test description",
      armCorrelationIds: ["4D045314-435A-41DA-B0A4-2CA7E9F87D12"],
      performance: [
        {
          metricName: "testMetric",
          expected: 23,
          actual: 20,
          expectedValueRange: { min: 1, max: 27 },
          unit: "ByteSeconds",
        },
      ],
      connectivity: {
        protocol: "TCP",
        port: 6,
        source: {
          azureResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resource-rg/providers/Microsoft.compute/virtualmachines/vm1",
        },
        target: {
          azureResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resource-rg/providers/Microsoft.compute/virtualmachines/vm2",
        },
      },
      additionalProperties: {},
      errorDetails: { errorCode: "504", errorMessage: "Gateway timeout error" },
      workload: { context: "webapp/scenario1", toolset: "Other" },
      impactGroupId: "testGroup1",
      confidenceLevel: "Low",
      clientIncidentDetails: { clientIncidentId: "123456", clientIncidentSource: "AzureDevops" },
      ongoingImpact: true,
      severity: "Critical",
      durationInSec: 26,
      detectionType: "BusinessAlert",
      durationMarginInSec: 28,
      hitCount: 21,
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a WorkloadImpact
 *
 * @summary create a WorkloadImpact
 * x-ms-original-file: 2026-01-01-preview/WorkloadPerformance_Create.json
 */
async function reportingPerformanceRelatedImpact(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.workloadImpacts.create("impact-002", {
    properties: {
      impactedResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resource-rg/providers/Microsoft.Sql/sqlserver/dbservercontext",
      startDateTime: new Date("2022-06-15T05:59:46.6517821Z"),
      impactDescription: "high cpu utilization",
      impactCategory: "Resource.Performance",
      workload: { context: "webapp/scenario1", toolset: "Other" },
      performance: [{ metricName: "CPU", actual: 90, expected: 60, unit: "garbage" }],
      clientIncidentDetails: { clientIncidentId: "AA123", clientIncidentSource: "Jira" },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await reportingArmOperationFailure();
  await reportingAvailabilityRelatedImpact();
  await reportingAConnectivityImpact();
  await workloadImpactsCreateMaximumSet();
  await reportingPerformanceRelatedImpact();
}

main().catch(console.error);
