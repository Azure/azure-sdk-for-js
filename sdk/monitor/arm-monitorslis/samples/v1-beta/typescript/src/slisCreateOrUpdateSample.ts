// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorslis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an SLI resource.
 *
 * @summary creates or updates an SLI resource.
 * x-ms-original-file: 2025-03-01-preview/Slis_CreateOrUpdate.json
 */
async function createSli(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.slis.createOrUpdate("testSG", "testSli", {
    properties: {
      description: "Measures the performance characteristics of the GetContosoUsers() API. ",
      category: "Latency",
      evaluationType: "WindowBased",
      enableAlert: true,
      destinationAmwAccounts: [
        {
          resourceId:
            "/subscriptions/<subId>/resourcegroups/<rgId>/providers/microsoft.monitor/accounts/<dest>",
          identity:
            "/subscriptions/<subId>/resourcegroups/<rgId>/providers/Microsoft.ManagedIdentity/userAssignedIdentities/<idName>",
        },
      ],
      baselineProperties: {
        baseline: {
          value: 99,
          evaluationPeriodDays: 30,
          evaluationCalculationType: "CalendarDays",
        },
      },
      sliProperties: {
        windowUptimeCriteria: { target: 95, comparator: ">=" },
        signals: {
          signalSources: [
            {
              signalSourceId: "A",
              sourceAmwAccountManagedIdentity:
                "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myIdentity",
              sourceAmwAccountResourceId:
                "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/microsoft.monitor/accounts/myAccount",
              metricNamespace: "ContosoMetricsWest",
              metricName: "Stamp1Latency",
              filters: [{ dimensionName: "ApiName", operator: "==", value: "GetContosoUsers" }],
              spatialAggregation: { type: "Average", dimensions: ["Region", "ResponseCode"] },
              temporalAggregation: { type: "Average", windowSizeMinutes: 5 },
            },
            {
              signalSourceId: "B",
              sourceAmwAccountManagedIdentity:
                "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myIdentity",
              sourceAmwAccountResourceId:
                "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/microsoft.monitor/accounts/myAccount",
              metricNamespace: "ContosoMetricsEast",
              metricName: "Stamp2Latency",
              filters: [{ dimensionName: "ApiName", operator: "==", value: "GetContosoUsers" }],
              spatialAggregation: { type: "Average", dimensions: ["Region", "ResponseCode"] },
              temporalAggregation: { type: "Average", windowSizeMinutes: 5 },
            },
          ],
          signalFormula: "(A + B) /2",
        },
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createSli();
}

main().catch(console.error);
