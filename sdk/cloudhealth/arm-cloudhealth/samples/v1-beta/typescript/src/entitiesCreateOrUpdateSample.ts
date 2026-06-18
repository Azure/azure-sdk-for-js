// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Entity
 *
 * @summary create a Entity
 * x-ms-original-file: 2026-01-01-preview/Entities_CreateOrUpdate.json
 */
async function entitiesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.entities.createOrUpdate(
    "rgopenapi",
    "myHealthModel",
    "uszrxbdkxesdrxhmagmzywebgbjj",
    {
      properties: {
        displayName: "My entity",
        canvasPosition: { x: 14, y: 13 },
        icon: { iconName: "Custom", customData: "rcitntvapruccrhtxmkqjphbxunkz" },
        healthObjective: 62,
        impact: "Standard",
        tags: { key1376: "sample tag" },
        signalGroups: {
          azureResource: {
            authenticationSetting: "auth123",
            azureResourceId:
              "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/rg1/providers/Microsoft.Compute/virtualMachines/vm1",
            azureResourceKind: "functionapp",
            signals: [
              {
                name: "uniqueSignalName1",
                signalDefinitionName: "sigdef1",
                signalKind: "AzureResourceMetric",
                metricNamespace: "microsoft.compute/virtualMachines",
                metricName: "cpuusage",
                aggregationType: "None",
                dimension: "nodename",
                dimensionFilter: "node1",
                displayName: "CPU usage",
                refreshInterval: "PT1M",
                timeGrain: "PT1M",
                dataUnit: "Count",
                evaluationRules: {
                  degradedRule: { operator: "LowerThan", threshold: 10 },
                  unhealthyRule: { operator: "LowerThan", threshold: 1 },
                },
              },
            ],
          },
          azureLogAnalytics: {
            authenticationSetting: "auth123",
            logAnalyticsWorkspaceResourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.OperationalInsights/workspaces/myworkspace",
            signals: [
              {
                name: "uniqueSignalName2",
                signalKind: "LogAnalyticsQuery",
                evaluationRules: {
                  degradedRule: { operator: "GreaterThan", threshold: 1 },
                  unhealthyRule: { operator: "GreaterThan", threshold: 5 },
                },
                refreshInterval: "PT1M",
                queryText: "print 1",
                timeGrain: "PT30M",
                valueColumnName: "result",
                displayName: "Test LA signal",
                dataUnit: "my unit",
              },
            ],
          },
          azureMonitorWorkspace: {
            authenticationSetting: "auth123",
            azureMonitorWorkspaceResourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.OperationalInsights/workspaces/myworkspace",
            signals: [
              {
                name: "pod-cpu-usage",
                signalDefinitionName: "PodCpuUsageDefinition",
                signalKind: "PrometheusMetricsQuery",
                displayName: "Pod CPU Usage",
                refreshInterval: "PT1M",
                dataUnit: "Percent",
                queryText: 'rate(container_cpu_usage_seconds_total{pod=~"my-app-.*"}[5m]) * 100',
                timeGrain: "PT5M",
                evaluationRules: {
                  degradedRule: { operator: "GreaterThan", threshold: 70 },
                  unhealthyRule: { operator: "GreaterThan", threshold: 90 },
                },
              },
            ],
          },
          dependencies: {
            aggregationType: "MinHealthy",
            unit: "Percentage",
            degradedThreshold: 80,
            unhealthyThreshold: 50,
          },
        },
        alerts: {
          unhealthy: {
            severity: "Sev1",
            description: "Alert description",
            actionGroupIds: [
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Insights/actionGroups/myactiongroup",
            ],
          },
          degraded: {
            severity: "Sev4",
            description: "Alert description",
            actionGroupIds: [
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Insights/actionGroups/myactiongroup",
            ],
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await entitiesCreateOrUpdate();
}

main().catch(console.error);
